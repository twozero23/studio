
"use client";
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLayoutProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
}

export const SectionLayout = ({
  id,
  title,
  icon: Icon,
  children,
  className,
  titleClassName,
  contentClassName,
  containerClassName
}: SectionLayoutProps) => {
  return (
    <section id={id} className={cn("py-16 md:py-20 bg-background", className)}>
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        <div className="mb-10 md:mb-12 text-center">
          <h2 className={cn("text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3", titleClassName)}>
            {Icon && <Icon className="h-8 w-8 text-primary" style={{ color: 'hsl(var(--primary))' }} />}
            {title}
          </h2>
          <div className="mt-3 h-1.5 w-24 bg-primary mx-auto rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
        </div>
        <div className={cn(contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
};
