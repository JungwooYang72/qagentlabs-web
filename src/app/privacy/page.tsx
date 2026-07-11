import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "Driver Hub 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-background">
      <article className="mx-auto w-full max-w-[800px] px-5 py-12 text-foreground md:px-8 md:py-16">
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          개인정보 처리방침
        </h1>

        <p className="mb-8 leading-8 text-muted-foreground">
          큐에이전트랩스(대표 양정우, 이하 &quot;운영자&quot;)은(는) Driver Hub(이하 &quot;서비스&quot;)를 이용하는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
        </p>

        <Section title="1. 서비스의 성격">
          <p>
            Driver Hub는 대리운전 기사님이 콜을 빠르게 판단하도록 돕는 <strong>보조 도구</strong>입니다.
          </p>
          <ul>
            <li>
              카카오T·티맵 등 대리운전 앱의 <strong>콜 화면에 표시되는 정보</strong>(예상 요금, 운행 시간, 목적지 등)를 <strong>접근성 기능을 통해 기기 안에서 분석</strong>하여, 기사님이 콜의 수익성·거리를 빠르게 판단하실 수 있도록 <strong>색상·알림으로 요약해 보여드립니다.</strong>
            </li>
            <li>
              서비스는 정보를 <strong>요약·표시할 뿐이며, 콜을 대신 수락·거절·조작하지 않습니다.</strong> 모든 수락·거절과 운행 판단은 전적으로 기사님이 하십니다.
            </li>
            <li>
              콜 화면에서 분석한 정보는 <strong>기기 안에서만 처리되며, 외부(서버)로 전송되지 않습니다.</strong>
            </li>
          </ul>
        </Section>

        <Section title="2. 수집·처리하는 정보">
          <p>서비스는 최소한의 정보만 처리합니다.</p>

          <Subsection title="가) 콜 화면 정보 (기기 내에서만 처리, 저장·전송하지 않음)">
            <ul>
              <li>접근성 기능으로 인식한 콜 화면의 표시 정보(예상 요금·운행 시간·목적지 등)</li>
              <li>
                이 정보는 <strong>색상·알림 요약을 위해 기기 안에서 실시간 분석</strong>되며, <strong>별도로 저장하거나 외부로 전송하지 않습니다.</strong>
              </li>
            </ul>
          </Subsection>
          <Subsection title="나) 위치정보 (전략보고서 기능 사용 시)">
            <ul>
              <li>전략보고서 기능을 사용할 때, 기기의 위치 정보를 읽습니다.</li>
              <li>
                읽은 위치는 기기 안에서만 사용되며(주변 지역 추천, 콜 가능성 점수 계산), 서버로 전송하거나 저장하지 않습니다.
              </li>
              <li>
                위치 권한을 허용하지 않아도 콜 판정 기능은 정상적으로 작동합니다. 이 경우 전략보고서는 시간 기준으로만 제공됩니다.
              </li>
            </ul>
          </Subsection>

          <Subsection title="다) 앱 사용 시 (서버와 주고받는 정보)">
            <ul>
              <li>
                <strong>기기 승인 코드</strong>(익명 설치 식별자) — 전화번호·IMEI·Android ID가 아니며, 특정 개인을 식별하지 않습니다. 서비스 사용 권한을 확인하기 위한 익명 코드입니다.
              </li>
              <li>
                이 코드를 통해 <strong>사용 권한(승인) 상태·만료일 등 운영 관리 정보</strong>를 서버와 확인합니다.
              </li>
              <li>
                서버로 전송되는 것은 <strong>위 익명 코드와 사용 권한 확인에 필요한 정보에 한합니다.</strong> 콜 내용·위치·손님 정보는 전송하지 않습니다.
              </li>
            </ul>
          </Subsection>

          <Subsection title="라) 베타 신청 시 (이용자가 직접 입력)">
            <ul>
              <li>(필수) 네이버 카페 닉네임</li>
              <li>(필수) 연락 수단(카카오톡 ID 또는 이메일 중 택1)</li>
              <li>(필수) 주 활동 지역, 사용 플랫폼, 사용 기기, Android 버전, 대리기사 경력</li>
              <li>(선택) 전화번호 — 강제하지 않으며, 명시적 동의 시에만 수집</li>
            </ul>
          </Subsection>

          <Subsection title="마) 오류 제보 시 (이용자가 직접 제출)">
            <ul>
              <li>플랫폼·화면 유형·기기명·Android 버전·앱 버전·증상 등</li>
              <li>
                손님 정보·상세 목적지 등 민감 항목은 <strong>가린 뒤</strong> 제출하도록 안내합니다.
              </li>
            </ul>
          </Subsection>

          <Subsection title="바) 수집하지 않는 정보">
            <ul>
              <li>주민등록번호 등 고유식별정보, 위치정보의 서버 전송, 통신사·금융 정보, 콜 화면 정보의 외부 전송, 기타 민감정보</li>
            </ul>
          </Subsection>
        </Section>

        <Section title="3. 수집·이용 목적">
          <ul>
            <li>서비스 사용 권한(승인)의 확인·연장·차단 등 운영 관리</li>
            <li>베타 참여자 식별, 설치·권한 설정 지원, 오류 대응</li>
            <li>서비스 품질 개선 및 운영 공지</li>
          </ul>
        </Section>

        <Section title="4. 처리 위탁 및 저장 위치">
          <p>
            운영자는 이용자의 동의 없이 개인정보를 제3자에게 <strong>제공</strong>하지 않습니다. 다만 서비스 운영을 위해 아래와 같이 처리를 <strong>위탁</strong>하거나 데이터를 저장합니다.
          </p>

          <div className="my-5 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-semibold">수탁자/서비스</th>
                  <th className="border-b border-border px-4 py-3 font-semibold">역할</th>
                  <th className="border-b border-border px-4 py-3 font-semibold">처리·저장 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-border px-4 py-3">Vercel / Upstash (Redis)</td>
                  <td className="border-b border-border px-4 py-3">사용 권한(승인) 정보 저장·확인 (해외 서버)</td>
                  <td className="border-b border-border px-4 py-3">기기 승인 코드(익명), 승인 상태·만료일</td>
                </tr>
                <tr>
                  <td className="border-b border-border px-4 py-3">Google (Forms/Sheets)</td>
                  <td className="border-b border-border px-4 py-3">베타 신청자 명단 저장·관리</td>
                  <td className="border-b border-border px-4 py-3">신청 폼 입력 정보</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Resend</td>
                  <td className="px-4 py-3">신청·문의 내용의 이메일 전송</td>
                  <td className="px-4 py-3">신청 폼 입력 정보</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul>
            <li>위 서비스는 각사의 개인정보 보호정책에 따라 데이터를 처리하며, 위탁·저장 내용 변경 시 본 방침에 반영합니다.</li>
            <li>카카오톡·네이버카페 이용 시에는 각 플랫폼의 약관·정책이 별도로 적용됩니다.</li>
          </ul>
        </Section>

        <Section title="5. 보유 및 이용 기간">
          <ul>
            <li>서비스 이용 종료 또는 이용자의 탈퇴/삭제 요청 시까지 보유 후 지체 없이 파기</li>
            <li>관련 법령상 보존 의무가 있는 경우 해당 기간 동안 보관</li>
            <li>콜 화면 정보: <strong>저장하지 않음</strong>(기기 내 실시간 분석 후 소멸)</li>
          </ul>
        </Section>

        <Section title="6. 정보주체의 권리">
          <p>
            이용자는 언제든지 본인 개인정보의 열람·정정·삭제·처리정지를 요청할 수 있습니다. 요청은 아래 연락처로 접수합니다.
          </p>
        </Section>

        <Section title="7. 파기 절차 및 방법">
          <p>
            보유기간 경과 또는 목적 달성 시, 전자적 파일은 복구 불가능한 방법으로 삭제하고 출력물은 분쇄합니다.
          </p>
        </Section>

        <Section title="8. 안전성 확보 조치">
          <ul>
            <li>접근 권한 최소화 및 관리자 통제</li>
            <li>기기 승인 코드의 익명 처리</li>
            <li>콜 화면 정보의 기기 내 처리(외부 미전송)</li>
            <li>오류 제보 시 민감정보 마스킹 안내</li>
          </ul>
        </Section>

        <Section title="9. 접근성 서비스 이용 고지">
          <p>
            본 서비스는 콜 화면 정보를 인식하고 그 위에 요약 정보를 표시하기 위해 <strong>Android 접근성 서비스</strong>를 사용합니다.
          </p>
          <ul>
            <li>
              접근성 서비스는 <strong>콜 화면의 표시 정보를 기기 내에서 분석</strong>하여 색상·알림으로 요약하는 목적에만 사용됩니다.
            </li>
            <li>
              접근성 서비스로 <strong>다른 앱을 조작하거나, 화면 내용을 외부로 전송하지 않습니다.</strong>
            </li>
            <li>앱 최초 실행 시 접근성 사용 목적을 고지하고, 이용자의 동의 후에만 활성화됩니다.</li>
          </ul>
        </Section>

        <Section title="10. 개인정보 보호책임자">
          <ul>
            <li>책임자: 양정우 / 개인정보 보호책임자 (대표 겸임)</li>
            <li>연락처: harrison.park@qagentlabs.com</li>
          </ul>
        </Section>

        <Section title="11. 고지 의무">
          <p>본 방침의 변경 시 시행 전 서비스 내 또는 운영 채널을 통해 안내합니다.</p>
          <ul>
            <li>시행일: 2026-07-11</li>
            <li>버전: 1.1</li>
          </ul>
        </Section>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-7">
      <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="space-y-4 text-[15px] leading-8 text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}
