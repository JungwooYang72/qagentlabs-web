/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function load(file) {
  if (file.endsWith(".json")) return JSON.parse(fs.readFileSync(file, "utf8"));
  const loaded = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  new Function("require", "module", "exports", code)(name => {
    const target = path.resolve(path.dirname(file), name);
    return load(target.endsWith(".json") ? target : target + ".ts");
  }, loaded, loaded.exports);
  return loaded.exports;
}
const { machineCareGuard, MACHINECARE_PROMPT } = load(path.resolve(__dirname, "../src/lib/machinecare-chat.ts"));

test("customer service answers stay separate from recruitment and explicit partnership routes to its form", () => {
  for (const question of ["다운로드는 어디서 하나요?", "데이터 복구를 상담하고 싶어요", "AI PC도 지원하나요?"]) {
    const answer = machineCareGuard(question, "pc", false, true);
    assert.equal(typeof answer, "string");
    assert.doesNotMatch(answer, /모집|inquiry=partner/);
  }
  assert.equal(machineCareGuard("노트북 전문 수리가 필요한데 부팅이 안 돼요", "pc", false, true), null);
  assert.match(machineCareGuard("전문 데이터 복구 제휴 문의", "pc", false, true), /inquiry=partner/);
  assert.doesNotMatch(MACHINECARE_PROMPT, /PC·노트북 부품 공급, 노트북 전문 수리, 전문 데이터 복구/);
});

test("intake and AI PC answers retain consent, uncertainty and separate service boundaries", () => {
  const intake = machineCareGuard("데이터 복구와 본사 입고 절차", "pc", false, true);
  for (const text of ["동의", "견적", "반환", "보장하지 않습니다", "포맷·자료 삭제"]) assert.ok(intake.includes(text));
  const aiPc = machineCareGuard("AI PC 지원", "pc", false, true);
  for (const text of ["준비", "실제 기기 검증", "별개"]) assert.ok(aiPc.includes(text));
});
