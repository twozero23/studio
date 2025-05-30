
"use client";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { AchievementHighlight } from '@/lib/portfolio-data-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Award, TrendingUp, Zap, DollarSign, Users, Smile, PieChart, ShieldCheck } from 'lucide-react';

const ICON_OPTIONS = [
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
  { value: 'Zap', label: 'Zap (Impact)', icon: Zap },
  { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Smile', label: 'Smile (Satisfaction)', icon: Smile },
  { value: 'PieChart', label: 'Pie Chart (Market Share)', icon: PieChart },
  { value: 'ShieldCheck', label: 'Shield Check (Security/QA)', icon: ShieldCheck },
];

export default function AdminAchievementsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading achievements editor...</p></AdminLayout>;
  }

  const setAchievements = (newAchievements: AchievementHighlight[]) => {
    updatePortfolioData(prev => ({ ...prev!, achievements: newAchievements }));
  };

  const renderAchievementItem = (
    item: AchievementHighlight,
    index: number,
    onChange: (index: number, updatedItem: Partial<AchievementHighlight>) => void
  ) => {
    const handleChange = (field: keyof AchievementHighlight, value: string) => {
      onChange(index, { [field]: value });
    };

    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`ach-metric-${index}`} label="Metric (e.g., 40%, 30.9M PKR)" value={item.metric} onChange={(e) => handleChange('metric', e.target.value)} />
        <FormField id={`ach-desc-${index}`} label="Description" value={item.description} onChange={(e) => handleChange('description', e.target.value)} />
        <div>
          <Label htmlFor={`ach-icon-${index}`} className="font-medium block mb-1">Icon (Optional)</Label>
          <Select
            value={item.icon || ''}
            onValueChange={(value) => handleChange('icon', value)}
          >
            <SelectTrigger id={`ach-icon-${index}`} className="w-full bg-background">
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Icon</SelectItem>
              {ICON_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center gap-2">
                    <opt.icon className="h-4 w-4" /> {opt.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Impact & Achievements"
        description="Showcase your key quantifiable achievements."
      >
        <ArrayManager
          items={portfolioData.achievements}
          setItems={setAchievements}
          renderItem={renderAchievementItem}
          generateNewItem={() => ({
            id: `ach-${Date.now()}`,
            metric: '',
            description: '',
            icon: 'Award',
          })}
          itemTypeName="Achievement"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
