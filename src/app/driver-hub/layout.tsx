import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QAgent Driver Hub 449 | 이용료·설치·유료 이용 신청',
  description: '카카오T·티맵·콜마너를 지원하는 Driver Hub 449. 현재 기능, 10월 16일 낮 12시 유료 전환 일정, 부가세 포함 이용료, Google Play 설치와 유료 이용 신청을 안내합니다.',
};

export default function DriverHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
