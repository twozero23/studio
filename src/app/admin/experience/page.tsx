"use client";
import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager, StringListManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { ExperienceEntry } from '@/lib/portfolio-data-types';
import { Label } from '@/components/ui/label';

const AdminLayout = dynamic(
  () => import('@/components/admin/AdminLayout').then(mod => mod.AdminLayout),
  { ssr: false }
);

export default function AdminExperiencePage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setExperience = useCallback((newExperience: ExperienceEntry[]) => {
    updatePortfolioData(prev => ({ ...prev, experience: newExperience }));
  }, [updatePortfolioData]);

  const renderExperienceItem = useCallback((
    item: ExperienceEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<ExperienceEntry>) => void
  ) => {
    const handleChange = (field: keyof ExperienceEntry, value: string | string[]) => {
      onChange(index, { [field]: value });
    };

    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`role-${index}`} label="Role / Title" value={item.role} onChange={(e) => handleChange('role', e.target.value)} />
        <FormField id={`company-${index}`} label="Company" value={item.company} onChange={(e) => handleChange('company', e.target.value)} />
        <FormField id={`period-${index}`} label="Period (e.g., JAN 2020 – PRESENT)" value={item.period} onChange={(e) => handleChange('period', e.target.value)} />
        <FormField id={`location-${index}`} label="Location (Optional)" value={item.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
        
        <div>
          <Label className="font-medium">Responsibilities</Label>
          <StringListManager
            list={item.responsibilities || []}
            setList={(newList) => handleChange('responsibilities', newList)}
            label="Responsibility"
          />
        </div>
        <div>
          <Label className="font-medium">Achievements</Label>
          <StringListManager
            list={item.achievements || []}
            setList={(newList) => handleChange('achievements', newList)}
            label="Achievement"
          />
        </div>
      </div>
    );
  }, []);

  const generateNewExperienceItem = useCallback(() => ({
    id: `exp-${Date.now()}`,
    role: '',
    company: '',
    period: '',
    location: '',
    responsibilities: [],
    achievements: [],
  }), []);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading experience editor...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Work Experience"
        description="Manage your professional roles and responsibilities."
      >
        <ArrayManager
          items={portfolioData.experience || []}
          setItems={setExperience}
          renderItem={renderExperienceItem}
          generateNewItem={generateNewExperienceItem}
          itemTypeName="Experience Entry"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}