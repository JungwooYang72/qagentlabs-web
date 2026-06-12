import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QAgent Driver Hub | 대리기사 콜 판단 신호등 무료 베타',
  description: '카카오·티맵 대리 콜 화면 위에 YELLOW/GREEN 신호를 표시하여 기사님의 콜 판단을 돕는 무료 베타 보조 앱입니다.',
};

export default function DriverHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
