
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Lightbulb, ExternalLink, CheckSquare, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

export const ProjectsSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="projects" title="Key Projects" icon={Lightbulb}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map(i => (
            <Card key={i} className="rounded-xl">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
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

  const { projects } = portfolioData;

  return (
    <SectionLayout id="projects" title="Signature Projects" icon={Lightbulb}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <Card 
            key={project.id} 
            className="flex flex-col rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary" style={{ color: 'hsl(var(--primary))' }}>{project.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground italic">Role: {project.role}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground mb-4 text-sm">{project.description}</p>
              {project.highlights && project.highlights.length > 0 && (
                <>
                  <h4 className="font-medium text-foreground mb-1 text-sm">Highlights:</h4>
                  <ul className="list-none space-y-1 text-sm mb-3">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">{tech}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
            {project.projectUrl && (
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                  <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
};
