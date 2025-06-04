
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Award, TrendingUp, Zap, DollarSign, Users, Smile, PieChart, ShieldCheck } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AchievementHighlight } from '@/lib/portfolio-data-types';

const iconMap: { [key: string]: React.ElementType } = {
  TrendingUp,
  Zap,
  DollarSign,
  Users,
  Smile,
  PieChart,
  ShieldCheck,
  Award, // Default icon
};


export const AchievementsSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="achievements" title="Impact & Achievements" icon={Award}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <Card key={i} className="rounded-xl">
              <CardHeader>
                <div className="h-10 w-10 bg-muted rounded-full mx-auto mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-1"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionLayout>
    );
  }

  const { achievements } = portfolioData;

  const parseMetric = (metric: string): number => {
    const lowerMetric = metric.toLowerCase();
    
    if (/\b(million|billion|thousand|lakh|crore)\b/i.test(lowerMetric)) {
      return NaN;
    }

    let numStr = lowerMetric.replace(/pkr|usd|eur|gbp|,|\s/gi, '');
    numStr = numStr.replace(/%/g, ''); 

    let multiplier = 1;
    if (numStr.endsWith('m')) {
      multiplier = 1000000;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith('k')) {
      multiplier = 1000;
      numStr = numStr.slice(0, -1);
    } else if (numStr.endsWith('b')) {
      multiplier = 1000000000;
      numStr = numStr.slice(0, -1);
    }

    const parsedValue = parseFloat(numStr);
    
    if (isNaN(parsedValue)) {
      return NaN; 
    }
    
    return parsedValue * multiplier;
  };


  const getSuffix = (metric: string): string => {
    if (metric.includes('%')) return '%';
    if (metric.toLowerCase().includes('pkr')) return ' PKR';
    return '';
  }

  const getPrefix = (metric: string): string => {
    return ''; 
  }


  return (
    <SectionLayout id="achievements" title="Impact & Achievements" icon={Award} className="bg-secondary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {achievements.map(achievement => {
          const IconComponent = achievement.icon ? iconMap[achievement.icon] || Award : Award;
          const rawMetricString = achievement.metric;
          let metricContent;

          const animatedValue = parseMetric(rawMetricString);
          const suffix = getSuffix(rawMetricString);
          const prefix = getPrefix(rawMetricString);
          
          const isTrulyZero = rawMetricString.trim().match(/^(0%?|0\.0%?)$/);
          const shouldUseAnimatedCounter = isFinite(animatedValue) && (animatedValue !== 0 || !!isTrulyZero);

          if (shouldUseAnimatedCounter) {
            metricContent = (
              <AnimatedCounter targetValue={animatedValue} duration={2000} suffix={suffix} prefix={prefix} />
            );
          } else {
            metricContent = <>{rawMetricString}</>;
          }
          
          return (
            <Card 
              key={achievement.id} 
              className="text-center rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform"
            >
              <CardHeader className="items-center pb-2">
                 <div className="p-3 rounded-full bg-primary/10 mb-3">
                    <IconComponent className="h-8 w-8 text-primary" style={{ color: 'hsl(var(--primary))' }} />
                 </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary" style={{ color: 'hsl(var(--primary))' }}>
                  {metricContent}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionLayout>
  );
};
