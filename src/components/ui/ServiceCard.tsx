import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <div className="group relative border-2 border-primary-700 bg-primary-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent-500 hover:shadow-[8px_8px_0_0_#ffffff] overflow-hidden">
      <div className="absolute -right-10 -top-10 h-32 w-32 bg-accent-500/10 rounded-full blur-3xl group-hover:bg-accent-500/20 transition-colors"></div>
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border-2 border-primary-700 bg-primary-950 text-accent-500 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-primary-950 transition-colors">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-4 text-2xl font-bold font-heading uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="text-primary-100 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
