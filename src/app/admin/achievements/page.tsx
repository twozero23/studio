
"use client";
import React, { useCallback } from 'react';
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

const NO_ICON_VALUE = "_NONE_";

export default function AdminAchievementsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setAchievements = useCallback((newAchievements: AchievementHighlight[]) => {
    updatePortfolioData(prev => ({ ...prev, achievements: newAchievements }));
  }, [updatePortfolioData]);

  const renderAchievementItem = useCallback((
    item: AchievementHighlight,
    index: number,
    onChange: (index: number, updatedItem: Partial<AchievementHighlight>) => void
  ) => {
    const handleFieldChange = (field: keyof AchievementHighlight, value: string) => {
      onChange(index, { [field]: value });
    };

    const handleIconChange = (selectedValue: string) => {
      const actualValueToSave = selectedValue === NO_ICON_VALUE ? '' : selectedValue;
      handleFieldChange('icon', actualValueToSave);
    };

    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`ach-metric-${index}`} label="Metric (e.g., 40%, 30.9M PKR)" value={item.metric} onChange={(e) => handleFieldChange('metric', e.target.value)} />
        <FormField id={`ach-desc-${index}`} label="Description" value={item.description} onChange={(e) => handleFieldChange('description', e.target.value)} />
        <div>
          <Label htmlFor={`ach-icon-${index}`} className="font-medium block mb-1">Icon (Optional)</Label>
          <Select
            value={item.icon || NO_ICON_VALUE} 
            onValueChange={handleIconChange}
          >
            <SelectTrigger id={`ach-icon-${index}`} className="w-full bg-background">
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NO_ICON_VALUE}>No Icon</SelectItem>
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
  }, []);

  const generateNewAchievementItem = useCallback(() => ({
    id: `ach-${Date.now()}`,
    metric: '',
    description: '',
    icon: 'Award', 
  }), []);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading achievements editor...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Impact & Achievements"
        description="Showcase your key quantifiable achievements."
      >
        <ArrayManager
          items={portfolioData.achievements || []}
          setItems={setAchievements}
          renderItem={renderAchievementItem}
          generateNewItem={generateNewAchievementItem}
          itemTypeName="Achievement"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
