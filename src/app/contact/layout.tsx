import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Premium Web Solutions',
  description: 'Get in touch with our team to discuss your next corporate web development project.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
