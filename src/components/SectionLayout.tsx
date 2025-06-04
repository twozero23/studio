
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
    <section id={id} className={cn("py-16 md:py-20 lg:py-24 bg-background overflow-hidden", className)}> {/* Added overflow-hidden for animations */}
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        <div className="mb-10 md:mb-12 text-center">
          <h2 
            className={cn(
              "text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3 animated-item animate-fadeInUp", 
              titleClassName
            )}
            style={{ animationDelay: '0.1s' }}
          >
            {Icon && <Icon className="h-8 w-8 text-primary" style={{ color: 'hsl(var(--primary))' }} />}
            {title}
          </h2>
          <div 
            className="mt-3 h-1.5 w-24 bg-primary mx-auto rounded-full animated-item animate-fadeInUp" 
            style={{ backgroundColor: 'hsl(var(--primary))', animationDelay: '0.2s' }}
          ></div>
        </div>
        <div 
          className={cn("animated-item animate-fadeInUp", contentClassName)}
          style={{ animationDelay: '0.3s' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
