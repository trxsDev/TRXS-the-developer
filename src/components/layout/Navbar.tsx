'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.portfolio'), href: '/portfolio' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary-700 bg-primary-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-8">
          <Link href="/" className="flex items-center gap-x-3 text-white hover:text-accent-500 transition-colors group">
            <Image
              src="/logo.svg"
              alt="TRXS Logo"
              width={42}
              height={42}
              className="object-contain select-none pointer-events-none transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl font-heading font-bold tracking-widest leading-none">
                TRXS
              </span>
              <span className="text-[9px] font-heading font-bold tracking-[0.25em] text-primary-400 uppercase  leading-none">
                THE DEVELOPER
              </span>
            </div>
          </Link>

          {/* Desktop Language Switcher */}

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans font-medium uppercase tracking-widest transition-colors hover:text-accent-500 ${isActive ? 'text-accent-500' : 'text-primary-100'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="primary" size="sm">{t('nav.unleashProject')}</Button>
          </Link>
        </div>

        <div className="hidden md:flex border-2 border-primary-700 bg-primary-900 overflow-hidden font-heading text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${i18n.language === 'en'
              ? 'bg-accent-500 text-primary-950'
              : 'text-primary-100 hover:bg-primary-800'
              }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('th')}
            className={`px-3 py-1.5 transition-colors border-l-2 border-primary-700 cursor-pointer ${i18n.language === 'th'
              ? 'bg-accent-500 text-primary-950'
              : 'text-primary-100 hover:bg-primary-800'
              }`}
          >
            TH
          </button>
        </div>

        {/* Mobile menu button and language switcher */}
        <div className="flex items-center gap-x-4 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex border-2 border-primary-700 bg-primary-900 overflow-hidden font-heading text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${i18n.language === 'en'
                ? 'bg-accent-500 text-primary-950'
                : 'text-primary-100'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('th')}
              className={`px-2.5 py-1 transition-colors border-l-2 border-primary-700 cursor-pointer ${i18n.language === 'th'
                ? 'bg-accent-500 text-primary-950'
                : 'text-primary-100'
                }`}
            >
              TH
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-primary-100 hover:text-accent-500 focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-8 w-8" aria-hidden="true" />
            ) : (
              <Menu className="block h-8 w-8" aria-hidden="true" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-primary-700 bg-primary-900">
          <div className="space-y-1 px-4 pb-6 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-4 text-lg font-sans font-medium uppercase tracking-widest border-l-4 transition-colors ${isActive
                    ? 'border-accent-500 bg-primary-950 text-accent-500'
                    : 'border-transparent text-primary-100 hover:border-accent-500 hover:bg-primary-950 hover:text-accent-500'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-6">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">{t('nav.unleashProject')}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
