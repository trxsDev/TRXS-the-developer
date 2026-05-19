import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Premium Web Solutions',
  description: 'A selection of our best web development work for corporate and enterprise clients.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
