'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61589994605767',
      icon: <FacebookIcon className="h-5 w-5" />,
      label: 'Facebook',
    },
    {
      href: 'https://github.com',
      icon: <GithubIcon className="h-5 w-5" />,
      label: 'GitHub',
    },
  ];

  return (
    <footer className="border-t-2 border-primary-700 bg-primary-950 relative z-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ส่วนบน: โลโก้ (ซ้าย) + ตัวเปลี่ยนภาษา (ขวา) */}
        <div className="flex flex-col items-center justify-between md:flex-row gap-y-4">
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-x-3 text-white hover:text-accent-500 transition-colors group">
              <Image
                src="/logo.svg"
                alt="TRXS Logo"
                width={42}
                height={42}
                className="object-contain select-none pointer-events-none transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-heading font-bold tracking-widest leading-none">TRXS</span>
                <span className="text-[9px] font-heading font-bold tracking-[0.25em] text-primary-400 uppercase leading-none">
                  THE DEVELOPER
                </span>
              </div>
            </Link>
          </div>

          <div className="md:ml-auto">
            <p className="mt-6 text-xs font-bold tracking-widest text-primary-500 uppercase md:mt-0">
              &copy; {new Date().getFullYear()} {t('footer.rightsReserved')}
            </p>
          </div>
        </div>

        {/* ส่วนล่าง: Social (ซ้าย) */}
        <div className="mt-8 border-t border-primary-800 pt-8 flex items-center justify-center md:justify-start">
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-accent-500 transition-colors"
              >
                <span className="sr-only">{social.label}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
