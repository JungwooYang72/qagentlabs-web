import { createClient } from "@vercel/kv";
import { NextResponse } from "next/server";

const VALID_PLANS = new Set(["BASIC", "STANDARD", "PRO_PLUS", "PREMIUM", "VIP", "MASTER"]);
const KEY_PREFIX = "driver-hub:entitlement:";

type DriverPlan = "BASIC" | "STANDARD" | "PRO_PLUS" | "PREMIUM" | "VIP" | "MASTER";

type EntitlementRecord = {
  installId: string;
  approved: boolean;
  plan: DriverPlan;
  expiresAt: string;
  isBlocked: boolean;
  graceHours: number;
  serverMessage: string;
};

function getKvClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("KV_REST_API_URL and KV_REST_API_TOKEN are required");
  }

  return createClient({ url, token });
}

function entitlementKey(installId: string) {
  return `${KEY_PREFIX}${installId}`;
}

function unauthorized() {
  return NextResponse.json(
    { error: "unauthorized" },
    { status: 401 }
  );
}

function isAuthorized(req: Request) {
  const adminToken = process.env.DRIVER_HUB_ADMIN_TOKEN?.trim();
  const authHeader = (req.headers.get("authorization") || "").trim();
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = bearerMatch?.[1]?.trim() || "";

  return Boolean(adminToken && token && token === adminToken);
}

function isValidExpiresAt(value: unknown) {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string") return false;

  const appParseablePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/;
  if (!appParseablePattern.test(value)) return false;

  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

function normalizeRecord(body: unknown): { record?: EntitlementRecord; error?: string } {
  if (!body || typeof body !== "object") {
    return { error: "JSON body is required" };
  }

  const input = body as Partial<EntitlementRecord>;
  const installId = typeof input.installId === "string" ? input.installId.trim() : "";

  if (!installId) {
    return { error: "installId is required" };
  }

  const planInput = typeof input.plan === "string" ? input.plan.trim().toUpperCase() : "BASIC";
  if (!VALID_PLANS.has(planInput)) {
    return { error: "plan must be one of BASIC, STANDARD, PRO_PLUS, PREMIUM, VIP, MASTER" };
  }

  if (!isValidExpiresAt(input.expiresAt)) {
    return { error: "expiresAt must use yyyy-MM-dd'T'HH:mm:ss'Z', yyyy-MM-dd'T'HH:mm:ssXXX, yyyy-MM-dd HH:mm:ss, or empty string" };
  }

  const graceHours = input.graceHours === undefined || input.graceHours === null
    ? 0
    : Number(input.graceHours);

  if (!Number.isFinite(graceHours) || graceHours < 0) {
    return { error: "graceHours must be a non-negative number" };
  }

  const isBlocked = input.isBlocked === true;

  return {
    record: {
      installId,
      approved: !isBlocked,
      plan: planInput as DriverPlan,
      expiresAt: typeof input.expiresAt === "string" ? input.expiresAt : "",
      isBlocked,
      graceHours: Math.floor(graceHours),
      serverMessage: typeof input.serverMessage === "string" ? input.serverMessage : "",
    },
  };
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const parsed = normalizeRecord(await req.json());
    if (parsed.error || !parsed.record) {
      return NextResponse.json(
        { error: parsed.error || "invalid_request" },
        { status: 400 }
      );
    }

    const kv = getKvClient();
    await kv.set(entitlementKey(parsed.record.installId), parsed.record);

    return NextResponse.json({ success: true, entitlement: parsed.record });
  } catch (error) {
    console.error("[DRIVER_HUB_ADMIN_ENTITLEMENTS] POST failed", error);
    return NextResponse.json(
      { error: "entitlement_save_failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const kv = getKvClient();
    const items: EntitlementRecord[] = [];

    for await (const key of kv.scanIterator({ match: `${KEY_PREFIX}*`, count: 100 })) {
      const record = await kv.get<EntitlementRecord>(key);
      if (record) items.push(record);
    }

    return NextResponse.json({ entitlements: items });
  } catch (error) {
    console.error("[DRIVER_HUB_ADMIN_ENTITLEMENTS] GET failed", error);
    return NextResponse.json(
      { error: "entitlement_list_failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const { searchParams } = new URL(req.url);
  const installId = searchParams.get("installId")?.trim();
  const mode = searchParams.get("mode")?.trim() || "block";

  if (!installId) {
    return NextResponse.json(
      { error: "installId is required" },
      { status: 400 }
    );
  }

  try {
    const kv = getKvClient();

    if (mode === "delete") {
      await kv.del(entitlementKey(installId));
      return NextResponse.json({ success: true, deleted: true, installId });
    }

    const blockedRecord: EntitlementRecord = {
      installId,
      approved: false,
      plan: "BASIC",
      expiresAt: "",
      isBlocked: true,
      graceHours: 0,
      serverMessage: "운영자에 의해 차단된 기기 승인 코드입니다.",
    };

    await kv.set(entitlementKey(installId), blockedRecord);
    return NextResponse.json({ success: true, entitlement: blockedRecord });
  } catch (error) {
    console.error("[DRIVER_HUB_ADMIN_ENTITLEMENTS] DELETE failed", error);
    return NextResponse.json(
      { error: "entitlement_delete_failed" },
      { status: 500 }
    );
  }
}
