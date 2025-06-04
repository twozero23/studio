
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { GraduationCap, School, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const EducationSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="education" title="Education" icon={GraduationCap}>
        <div className="space-y-6 animate-pulse">
          {[1, 2].map(i => (
            <Card key={i} className="rounded-xl">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionLayout>
    );
  }

  const { education } = portfolioData;

  return (
    <SectionLayout id="education" title="Academic Background" icon={GraduationCap} className="bg-secondary">
      <div className="max-w-2xl mx-auto space-y-6">
        {education.map(edu => (
          <Card 
            key={edu.id} 
            className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2" style={{ color: 'hsl(var(--primary))' }}>
                <GraduationCap className="h-6 w-6" /> {edu.degree}
              </CardTitle>
              <CardDescription className="text-md text-foreground flex items-center gap-2 pt-1">
                <School className="h-5 w-5 text-muted-foreground"/> {edu.institution}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{edu.period}</span>
              </div>
              {edu.grade && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Grade/Details: {edu.grade}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
};
