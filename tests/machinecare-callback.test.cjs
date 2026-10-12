/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const keys = ["KV_REST_API_URL", "KV_REST_API_TOKEN", "MACHINECARE_CALLBACK_ADMIN_TOKEN",
  "MACHINECARE_CALLBACK_HQ_EMAIL", "MACHINECARE_CALLBACK_PRIMARY_EMAIL", "MACHINECARE_CALLBACK_BACKUP_EMAIL",
  "MACHINECARE_CALLBACK_FROM_EMAIL", "RESEND_API_KEY", "MACHINECARE_CALLBACK_ENABLED", "MACHINECARE_CALLBACK_VERIFIED_REQUEST_ID"];
function harness() {
  const original = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  for (const key of keys) delete process.env[key];
  const db = new Map(), ttl = new Map(), cache = new Map(), emails = [];
  let storageFailed = false, mailFailed = false, dropRecordWrites = false;
  const kv = {
    get: async key => { if (storageFailed) throw Error("test offline"); return db.has(key) ? structuredClone(db.get(key)) : null; },
    set: async (key, value, options = {}) => { if (storageFailed) throw Error("test offline"); if (options.nx && db.has(key)) return null; if (dropRecordWrites && key.startsWith("machinecare:callback:record:")) return "OK"; db.set(key, structuredClone(value)); if (options.ex) ttl.set(key, options.ex); return "OK"; },
    incr: async key => { const next = (db.get(key) || 0) + 1; db.set(key, next); return next; },
    expire: async (key, seconds) => { ttl.set(key, seconds); return 1; },
    scanIterator: async function* () { for (const key of db.keys()) if (key.startsWith("machinecare:callback:record:")) yield key; },
  };
  class MockResend {
    emails = { send: async (data, options) => { emails.push({ data, options }); return mailFailed ? { error: { message: "test delivery failure" }, data: null } : { data: { id: "mock-mail-id" }, error: null }; } };
  }
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const loadedModule = { exports: {} };
    cache.set(file, loadedModule.exports);
    const customRequire = name => {
      if (name === "@vercel/kv") return { createClient: () => kv };
      if (name === "resend") return { Resend: MockResend };
      if (name.startsWith("@/") || name.startsWith("./")) {
        const resolved = name.startsWith("@/") ? path.join(root, "src", name.slice(2)) : path.resolve(path.dirname(file), name);
        return load(resolved + ".ts");
      }
      return require(name);
    };
    const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    new Function("require", "module", "exports", output)(customRequire, loadedModule, loadedModule.exports);
    cache.set(file, loadedModule.exports); return loadedModule.exports;
  }
  const token = "synthetic-test-token-never-used-in-production";
  const configure = () => Object.assign(process.env, {
    KV_REST_API_URL: "https://synthetic-storage.example.com", KV_REST_API_TOKEN: "synthetic-kv",
    MACHINECARE_CALLBACK_ADMIN_TOKEN: token, MACHINECARE_CALLBACK_HQ_EMAIL: "hq@example.com",
    MACHINECARE_CALLBACK_PRIMARY_EMAIL: "primary@example.com", MACHINECARE_CALLBACK_BACKUP_EMAIL: "backup@example.com",
    MACHINECARE_CALLBACK_FROM_EMAIL: "sender@example.com", RESEND_API_KEY: "synthetic-resend",
  });
  return { db, ttl, emails, configure, token,
    shared: load(path.join(root, "src/lib/machinecare-callback.ts")),
    store: load(path.join(root, "src/lib/machinecare-callback-store.ts")),
    api: load(path.join(root, "src/app/api/machinecare/callback/route.ts")),
    admin: load(path.join(root, "src/app/api/admin/machinecare/requests/route.ts")),
    failStorage: value => { storageFailed = value; }, dropRecordWrites: value => { dropRecordWrites = value; }, failMail: value => { mailFailed = value; },
    restore: () => { for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } },
  };
}
const input = { name: "시험 고객", phone: "010-0000-0000", region: "시험 지역", availableTime: "연락 금지 — 자동 검증", summary: "실제 고객이 아닌 테스트 증상 요약" };
const request = (url, method, body, headers = {}) => new Request("https://www.qagentlabs.com" + url, { method, headers: { Origin: "https://www.qagentlabs.com", "Content-Type": "application/json", ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
async function open(h) {
  h.configure();
  const auth = { Authorization: "Bearer " + h.token };
  const response = await h.admin.POST(request("/api/admin/machinecare/requests", "POST", {}, auth));
  assert.equal(response.status, 200);
  const data = await response.json();
  const id = data.item.record.id;
  process.env.MACHINECARE_CALLBACK_ENABLED = "true"; process.env.MACHINECARE_CALLBACK_VERIFIED_REQUEST_ID = id;
  assert.equal(await h.store.callbackAvailable(), false, "provider acceptance alone cannot open intake");
  const confirmed = await h.admin.PATCH(request("/api/admin/machinecare/requests", "PATCH",
    { id, action: "confirm-verification", confirmedReceiptAndNotification: true }, auth));
  assert.equal(confirmed.status, 200);
  assert.equal(await h.store.callbackAvailable(), true);
  return { id, auth };
}
test("validation rejects missing fields, invalid phones and control characters", () => {
  const h = harness(); try {
    assert.deepEqual(h.shared.parseCallbackInput(input), input);
    for (const invalid of [{ ...input, phone: "abc" }, { ...input, region: "" }, { ...input, summary: "x".repeat(2001) }, { ...input, name: "x\u0000" }]) assert.equal(h.shared.parseCallbackInput(invalid), null);
  } finally { h.restore(); }
});
test("closed intake and unauthorized admin cannot store or expose customer information", async () => {
  const h = harness(); try {
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...input, requestId: randomUUID(), consent: true }))).status, 503);
    for (const method of ["GET", "POST", "PATCH"]) assert.equal((await h.admin[method](request("/api/admin/machinecare/requests", method, method === "GET" ? undefined : {}))).status, 401);
    assert.equal((await h.api.POST(new Request("http://localhost:3111/api/machinecare/callback", { method: "POST", headers: { Origin: "https://www.qagentlabs.com", Host: "www.qagentlabs.com" }, body: "{}" }))).status, 503);
    h.configure();
    assert.equal((await h.admin.GET(request("/api/admin/machinecare/requests", "GET", undefined, { Authorization: "Bearer " + "é".repeat(h.token.length) }))).status, 401);
    assert.equal(h.db.size, 0);
  } finally { h.restore(); }
});
test("test save/read, explicit HQ confirmation and unchanged configuration gate opening", async () => {
  const h = harness(); try {
    const { id, auth } = await open(h);
    const response = await h.admin.GET(request("/api/admin/machinecare/requests?id=" + id, "GET", undefined, auth));
    assert.equal((await response.json()).items[0].record.id, id);
    assert.equal(h.emails[0].data.to[0], "hq@example.com");
    assert(!h.emails[0].data.text.includes("000-0000"));
    process.env.MACHINECARE_CALLBACK_PRIMARY_EMAIL = "changed@example.com";
    assert.equal(await h.store.callbackAvailable(), false, "changing a real operator requires verification again");
  } finally { h.restore(); }
});
test("reviewed submit is stored once, retry is idempotent, manual assignment uses server operators", async () => {
  const h = harness(); try {
    const { auth } = await open(h), id = randomUUID();
    const body = { ...input, requestId: id, consent: true, assignedTo: "attacker@example.com", verification: true };
    for (let i = 0; i < 2; i++) {
      const response = await h.api.POST(request("/api/machinecare/callback", "POST", body));
      assert.equal(response.status, 200); assert.equal((await response.json()).requestId, id);
    }
    assert.equal(h.emails.length, 2, "one verification email, one callback email");
    assert.equal(h.ttl.get("machinecare:callback:record:" + id), 90 * 86400);
    let record = await h.store.readCallback(id);
    assert.equal(record.record.verification, false); assert.equal(record.assignment, null);
    for (const role of ["primary", "backup"]) {
      assert.equal((await h.admin.PATCH(request("/api/admin/machinecare/requests", "PATCH", { id, role }, auth))).status, 200);
      record = await h.store.readCallback(id); assert.equal(record.assignment.email, role + "@example.com");
    }
    assert.equal((await h.admin.PATCH(request("/api/admin/machinecare/requests", "PATCH", { id, role: "admin" }, auth))).status, 400);
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...body, summary: "different payload" }))).status, 502);
  } finally { h.restore(); }
});
test("unconfirmed storage never returns success, and origin/consent are required", async () => {
  const h = harness(); try {
    await open(h);
    const body = { ...input, requestId: randomUUID(), consent: true };
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", body, { Origin: "https://example.org" }))).status, 403);
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...body, consent: false }))).status, 400);
    h.dropRecordWrites(true);
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", body))).status, 502);
    h.dropRecordWrites(false);
    h.failStorage(true);
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", body))).status, 503);
  } finally { h.restore(); }
});
test("failed mail cannot verify/open intake; a saved request remains readable if later mail fails", async () => {
  const h = harness(); try {
    h.configure(); h.failMail(true);
    const auth = { Authorization: "Bearer " + h.token };
    const response = await h.admin.POST(request("/api/admin/machinecare/requests", "POST", {}, auth));
    const item = (await response.json()).item;
    assert.equal(item.notification.accepted, false);
    assert.equal((await h.admin.PATCH(request("/api/admin/machinecare/requests", "PATCH", { id: item.record.id, action: "confirm-verification", confirmedReceiptAndNotification: true }, auth))).status, 400);
    h.failMail(false); await open(h); h.failMail(true);
    const id = randomUUID(); assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...input, requestId: id, consent: true }))).status, 200);
    assert.equal((await h.store.readCallback(id)).notification.accepted, false);
  } finally { h.restore(); }
});
test("rate limit applies to new requests and Driver Hub namespace stays untouched", async () => {
  const h = harness(); try {
    await open(h); h.db.set("driver-hub:entitlement:existing", { approved: true });
    for (let i = 0; i < 5; i++) assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...input, requestId: randomUUID(), consent: true }))).status, 200);
    assert.equal((await h.api.POST(request("/api/machinecare/callback", "POST", { ...input, requestId: randomUUID(), consent: true }))).status, 429);
    assert.deepEqual(h.db.get("driver-hub:entitlement:existing"), { approved: true });
  } finally { h.restore(); }
});
