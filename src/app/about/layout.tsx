import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Premium Web Solutions',
  description: 'Learn about our team, mission, and the expertise we bring to enterprise web development.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
