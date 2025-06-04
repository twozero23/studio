
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { ListChecks, Star } from 'lucide-react'; // Example icons
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { CustomSectionEntry } from '@/lib/portfolio-data-types';

export const CustomSectionsDisplay = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData || !portfolioData.customSections || portfolioData.customSections.length === 0) {
    return null; 
  }

  const { customSections } = portfolioData;

  return (
    <>
      {customSections.map((section, index) => (
        <SectionLayout
          key={section.id}
          id={`custom-${section.id}`}
          title={section.title}
          icon={index % 2 === 0 ? ListChecks : Star} 
          className={index % 2 === 0 ? 'bg-background' : 'bg-secondary'}
        >
          <div className="max-w-3xl mx-auto">
            {section.items.length > 0 ? (
              <Card className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform">
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {section.items.map(item => (
                    item.key && item.value && ( 
                      <div key={item.id} className="py-2">
                        <h4 className="font-semibold text-primary text-md" style={{ color: 'hsl(var(--primary))' }}>
                          {item.key}:
                        </h4>
                        <p className="text-foreground text-md">{item.value}</p>
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-muted-foreground">No items in this section yet.</p>
            )}
          </div>
        </SectionLayout>
      ))}
    </>
  );
};
