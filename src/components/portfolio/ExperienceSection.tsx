
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Briefcase, CheckCircle, MapPin, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const ExperienceSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="experience" title="Professional Experience" icon={Briefcase}>
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionLayout>
    );
  }

  const { experience } = portfolioData;

  return (
    <SectionLayout id="experience" title="Professional Journey" icon={Briefcase}>
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border rounded-full transform md:-translate-x-1/2"></div>

        {experience.map((job, index) => (
          <div key={job.id} className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="hidden md:flex w-1/2"></div> {/* Spacer for desktop */}
            <div className={`relative w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
              {/* Timeline dot */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background bg-primary z-10 ${index % 2 === 0 ? 'md:left-[-2px]' : 'md:right-[-2px]'} left-[-2px] md:left-auto`}></div>
              
              <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full ml-8 md:ml-0">
                <CardHeader className={`${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary" style={{ color: 'hsl(var(--primary))' }}>{job.role}</CardTitle>
                  <CardDescription className="text-md text-foreground">
                    {job.company}
                  </CardDescription>
                  <div className={`flex items-center gap-2 mt-1 text-sm text-muted-foreground ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                    <CalendarDays className="h-4 w-4" />
                    <span>{job.period}</span>
                  </div>
                  {job.location && (
                    <div className={`flex items-center gap-2 mt-1 text-sm text-muted-foreground ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                </CardHeader>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${job.id}`} className="border-t">
                     <AccordionTrigger className={`px-6 py-3 text-sm font-medium hover:bg-muted/50 ${index % 2 === 0 ? '' : 'md:text-right flex-row-reverse'}`}>
                        {index % 2 === 0 ? 'Key Contributions & Achievements' : <span className="flex-1 text-right">Key Contributions & Achievements</span>}
                     </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-left"> {/* Ensure content is always left-aligned */}
                      {job.responsibilities && job.responsibilities.length > 0 && (
                        <>
                          <h4 className="font-semibold text-foreground mb-2">Responsibilities:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                            {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                          </ul>
                        </>
                      )}
                      {job.achievements && job.achievements.length > 0 && (
                        <>
                          <h4 className="font-semibold text-foreground mt-3 mb-2">Achievements:</h4>
                          <ul className="space-y-1 text-sm">
                            {job.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
