import type { Metadata } from "next";
import MachineCareRequests from "./MachineCareRequests";
export const metadata: Metadata = { title: "MachineCare 본부 접수 확인", robots: { index: false, follow: false } };
export default function Page() { return <MachineCareRequests />; }
