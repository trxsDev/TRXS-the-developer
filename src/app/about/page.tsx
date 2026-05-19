"use client";

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import CircularText from '@/components/ui/CircularText';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-16 gap-y-16 sm:gap-y-24 lg:max-w-none lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl dark:text-white">
              {t('about.title')}
            </h2>
            <p className="mt-4 text-lg text-primary-600 dark:text-primary-400">
              {t('about.subtitle_1')}
            </p>
            <p className="mt-4 text-lg text-primary-600 dark:text-primary-400">
              {t('about.subtitle_2')}
            </p>
            
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-primary-600 dark:text-primary-400 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="inline font-semibold text-primary-900 dark:text-white">
                  <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-accent-600" aria-hidden="true" />
                  {t('about.techMasteryTitle')}.
                </dt>{' '}
                <dd className="inline">{t('about.techMasteryDesc')}</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-primary-900 dark:text-white">
                  <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-accent-600" aria-hidden="true" />
                  {t('about.businessDesignTitle')}.
                </dt>{' '}
                <dd className="inline">{t('about.businessDesignDesc')}</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-primary-900 dark:text-white">
                  <CheckCircle2 className="absolute left-1 top-1 h-5 w-5 text-accent-600" aria-hidden="true" />
                  {t('about.reliablePartnershipTitle')}.
                </dt>{' '}
                <dd className="inline">{t('about.reliablePartnershipDesc')}</dd>
              </div>
            </dl>
          </div>
          
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 to-primary-900 border border-primary-800 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 lg:pt-80 flex flex-col justify-end min-h-[480px]">
            {/* Centerpiece: Proportional replica of the background watermark */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
              <div className="relative flex items-center justify-center w-[400px] h-[400px] overflow-visible scale-75 sm:scale-85">
                {/* 1. Dashed outer ring */}
                <div className="absolute inset-0 border border-dashed border-primary-600 rounded-full animate-[spin_80s_linear_infinite] opacity-15" />
                
                {/* 2. Extra rings */}
                <div className="absolute inset-0 border border-primary-500/20 rounded-full scale-[1.15]" />
                <div className="absolute inset-0 border-2 border-accent-500/20 rounded-full scale-[0.95]" />
                <div className="absolute inset-0 border border-primary-500/30 rounded-full scale-[0.75]" />
                
                {/* 3. Circular Text */}
                <CircularText
                  text="TRXS THE DEVELOPER • TRXS THE DEVELOPER • TRXS THE DEVELOPER • "
                  radius={170}
                  fontSize={20}
                  letterSpacing={5.6}
                  spinDuration={45}
                  fillClassName="fill-white"
                  className="opacity-15"
                />

                {/* 4. Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/logo.svg"
                    alt=""
                    className="w-56 h-56 object-contain opacity-40 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  />
                </div>
              </div>
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary-950 via-primary-950/80 to-transparent pointer-events-none z-0" />

            {/* Mission Content overlay */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight text-white">{t('about.missionTitle')}</h3>
              <p className="mt-2 text-lg leading-7 text-primary-200">
                {t('about.missionDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl dark:text-white">
            {t('about.ctaTitle')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-600 dark:text-primary-400">
            {t('about.ctaDesc')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/contact">
              <Button size="lg">{t('about.ctaBtn')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
