import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  href: string;
}

export function ProjectCard({ title, category, description, imageUrl, href }: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group block bg-primary-900 border-2 border-primary-700 transition-all duration-300 hover:border-accent-500 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#ffffff] relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-950 border-b-2 border-primary-700 group-hover:border-accent-500 transition-colors duration-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80 grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-600 font-heading tracking-widest uppercase">
            <span>No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-primary-950/40 opacity-100 transition-opacity group-hover:opacity-0" />
      </div>
      <div className="p-6 relative z-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-500">
          {category}
        </p>
        <h3 className="mb-3 text-2xl font-bold font-heading uppercase text-white group-hover:text-accent-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-primary-100">
          {description}
        </p>
      </div>
    </Link>
  );
}
