
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const AboutSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="about" title="About Me" icon={User}>
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-6 bg-muted rounded w-full"></div>
          <div className="h-6 bg-muted rounded w-5/6"></div>
          <div className="h-6 bg-muted rounded w-full"></div>
          <div className="h-6 bg-muted rounded w-3/4"></div>
        </div>
      </SectionLayout>
    );
  }

  const { aboutMe, summary } = portfolioData;

  return (
    <SectionLayout id="about" title="About Me" icon={User} className="bg-secondary">
      <Card className="max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden bg-card transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform">
        <CardContent className="p-8 md:p-10">
          <p className="text-lg md:text-xl text-card-foreground leading-relaxed whitespace-pre-line">
            {aboutMe || summary}
          </p>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
