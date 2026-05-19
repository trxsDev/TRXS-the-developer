"use client";

import { useState } from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    key: "thpe",
    categoryKey: "corporate",
    imageUrl: "/images/project/thpe.png",
    href: "https://thpe-electrical-engineering.vercel.app/"
  },
  {
    key: "easytel",
    categoryKey: "apps",
    imageUrl: "/images/project/easytel.png",
    href: "https://easy-telemed.vercel.app/"
  },
];

const FILTER_CATEGORIES = [
  { id: 'all', labelKey: 'portfolio.filters.all' },
  { id: 'corporate', labelKey: 'portfolio.filters.corporate' },
  { id: 'apps', labelKey: 'portfolio.filters.apps' }
];

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.categoryKey === activeFilter);

  return (
    <div className="bg-primary-950/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('portfolio.title')}
          </h1>
          <p className="mt-4 text-lg leading-8 text-primary-100">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {FILTER_CATEGORIES.map((category) => {
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-white text-primary-950 shadow-md"
                    : "bg-primary-900/50 text-primary-100 shadow-sm ring-1 ring-inset ring-primary-700 hover:bg-primary-800 hover:text-white"
                  }`}
              >
                {t(category.labelKey)}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  title={t(`portfolio.projects.${project.key}.title`)}
                  category={t(`portfolio.filters.${project.categoryKey}`)}
                  description={t(`portfolio.projects.${project.key}.description`)}
                  imageUrl={project.imageUrl}
                  href={project.href}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="col-span-full py-16 text-center text-primary-100"
            >
              {t('portfolio.noProjects')}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
