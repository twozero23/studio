
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ExperienceSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="experience" title="Professional Journey" icon={Briefcase}>
        <div className="space-y-8 max-w-3xl mx-auto">
          {[1, 2].map(i => (
            <Card key={i} className="animate-pulse p-6 shadow-lg rounded-xl">
              <div className="h-7 bg-muted rounded w-3/4 mb-3"></div> {/* Role */}
              <div className="h-5 bg-muted rounded w-1/2 mb-2"></div> {/* Company/Location */}
              <div className="h-4 bg-muted rounded w-1/3 mb-5"></div> {/* Period */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div> {/* Bullet 1 */}
                <div className="h-4 bg-muted rounded w-5/6"></div> {/* Bullet 2 */}
                <div className="h-4 bg-muted rounded w-full"></div> {/* Bullet 3 */}
              </div>
            </Card>
          ))}
        </div>
      </SectionLayout>
    );
  }

  const { experience } = portfolioData;

  return (
    <SectionLayout id="experience" title="Professional Journey" icon={Briefcase}>
      <div className="max-w-3xl mx-auto space-y-8">
        {experience.map((job) => {
          const keyContributions = [...job.responsibilities, ...job.achievements];
          return (
            <Card 
              key={job.id} 
              className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl md:text-2xl font-semibold text-foreground">{job.role}</CardTitle>
                <p className="text-md font-medium text-primary pt-1" style={{ color: 'hsl(var(--primary))' }}>
                  {job.company}{job.location && `, ${job.location}`}
                </p>
                <p className="text-sm text-muted-foreground pt-1">{job.period}</p>
              </CardHeader>
              <CardContent>
                {keyContributions.length > 0 && (
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                    {keyContributions.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionLayout>
  );
};
