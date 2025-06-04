
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Layers, Wrench, Zap, Brain } from 'lucide-react'; // Layers for Technical, Wrench for Tools, Zap for Soft Skills
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/lib/portfolio-data-types';

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon: React.ElementType;
}

const SkillCategoryCard: React.FC<SkillCategoryProps> = ({ title, skills, icon: Icon }) => (
  <Card className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform flex flex-col h-full">
    <CardHeader className="flex flex-row items-center space-x-3 pb-3">
      <Icon className="h-6 w-6 text-primary" style={{ color: 'hsl(var(--primary))' }} />
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Badge 
            key={skill.id} 
            variant="secondary" 
            className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-all duration-200 ease-out hover:scale-105" 
            style={{ backgroundColor:'hsl(var(--primary)/0.1)', color:'hsl(var(--primary))', borderColor: 'hsl(var(--primary)/0.3)'}}
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);


export const SkillsSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="skills" title="Skills & Expertise" icon={Zap}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <Card key={i} className="rounded-xl">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                  <div className="h-6 w-24 bg-muted rounded-full"></div>
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionLayout>
    );
  }

  const { skills } = portfolioData;

  const technicalBlockchain = skills.technical.filter(s => s.category === 'Blockchain & Web3');
  const technicalPM = skills.technical.filter(s => s.category === 'Product Management');
  const technicalDT = skills.technical.filter(s => s.category === 'Digital Transformation');


  return (
    <SectionLayout id="skills" title="Skills & Expertise" icon={Brain} className="bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {technicalBlockchain.length > 0 && (
          <SkillCategoryCard title="Blockchain & Web3" skills={technicalBlockchain} icon={Layers} />
        )}
        {technicalPM.length > 0 && (
          <SkillCategoryCard title="Product Management" skills={technicalPM} icon={Zap} /> // Using Zap for dynamic PM skills
        )}
        {technicalDT.length > 0 && (
          <SkillCategoryCard title="Digital Transformation" skills={technicalDT} icon={Brain} /> // Brain for strategic DT
        )}
         {skills.tools.length > 0 && (
          <SkillCategoryCard title="Technical Tools" skills={skills.tools} icon={Wrench} />
        )}
        {skills.soft.length > 0 && (
          <SkillCategoryCard title="Soft Skills" skills={skills.soft} icon={Zap} />
        )}
      </div>
    </SectionLayout>
  );
};
