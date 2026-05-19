"use client";

import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
  </svg>
);

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage(t('contact.validationError', { defaultValue: 'Please fill in all required fields (Name, Email, Message).' }));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          budget: formData.budget || t('contact.budgetOptions.tier1')
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', budget: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl dark:text-white">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-lg leading-8 text-primary-600 dark:text-primary-400">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-3xl bg-primary-900 p-10 text-white sm:p-12">
            <h3 className="text-2xl font-bold tracking-tight">{t('contact.directTitle')}</h3>
            <p className="mt-4 text-primary-200">
              {t('contact.directDesc')}
            </p>

            <dl className="mt-10 space-y-8 text-base leading-7">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-accent-500" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-white transition-colors" href="mailto:theppratan.dev@gmail.com">
                    theppratan.dev@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Phone</span>
                  <Phone className="h-7 w-6 text-accent-500" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-white transition-colors" href="tel:+66 96-807-7615">
                    +66 96-807-7615
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon className="h-7 w-6 text-accent-500" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-white transition-colors" href="https://www.facebook.com/profile.php?id=61589994605767" target="_blank" rel="noopener noreferrer">
                    TRXS The Developer
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-primary-900 dark:text-primary-100">
                    {t('contact.labels.name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-primary-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6 dark:bg-primary-900/50 dark:text-white dark:ring-primary-700 dark:focus:ring-accent-500 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-primary-900 dark:text-primary-100">
                    {t('contact.labels.company')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      autoComplete="organization"
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-primary-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6 dark:bg-primary-900/50 dark:text-white dark:ring-primary-700 dark:focus:ring-accent-500 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary-900 dark:text-primary-100">
                    {t('contact.labels.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-primary-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6 dark:bg-primary-900/50 dark:text-white dark:ring-primary-700 dark:focus:ring-accent-500 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="budget" className="block text-sm font-semibold leading-6 text-primary-900 dark:text-primary-100">
                    {t('contact.labels.budget')}
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6 dark:bg-primary-900/50 dark:text-white dark:ring-primary-700 dark:focus:ring-accent-500 disabled:opacity-50"
                    >
                      <option value={t('contact.budgetOptions.tier1')}>{t('contact.budgetOptions.tier1')}</option>
                      <option value={t('contact.budgetOptions.tier2')}>{t('contact.budgetOptions.tier2')}</option>
                      <option value={t('contact.budgetOptions.tier3')}>{t('contact.budgetOptions.tier3')}</option>
                      <option value={t('contact.budgetOptions.tier4')}>{t('contact.budgetOptions.tier4')}</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-primary-900 dark:text-primary-100">
                    {t('contact.labels.message')} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-primary-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm sm:leading-6 dark:bg-primary-900/50 dark:text-white dark:ring-primary-700 dark:focus:ring-accent-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {status === 'success' && (
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {t('contact.successMessage', { defaultValue: 'ส่งข้อความสำเร็จแล้ว! ผมจะติดต่อกลับโดยเร็วที่สุด' })}
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button type="submit" size="lg" disabled={status === 'loading'}>
                  {status === 'loading' ? t('contact.labels.sending', { defaultValue: 'กำลังส่ง...' }) : t('contact.labels.send')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
