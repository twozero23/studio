
"use client";
import React, { useCallback } from 'react'; // Added useCallback
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { EducationEntry } from '@/lib/portfolio-data-types';

export default function AdminEducationPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading education editor...</p></AdminLayout>;
  }

  const setEducation = (newEducation: EducationEntry[]) => {
    updatePortfolioData(prev => ({ ...prev!, education: newEducation }));
  };

  const renderEducationItem = useCallback((
    item: EducationEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<EducationEntry>) => void
  ) => {
    const handleChange = (field: keyof EducationEntry, value: string) => {
      onChange(index, { [field]: value });
    };

    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`edu-degree-${index}`} label="Degree / Qualification" value={item.degree} onChange={(e) => handleChange('degree', e.target.value)} />
        <FormField id={`edu-institution-${index}`} label="Institution" value={item.institution} onChange={(e) => handleChange('institution', e.target.value)} />
        <FormField id={`edu-period-${index}`} label="Period (e.g., 2011 – 2015)" value={item.period} onChange={(e) => handleChange('period', e.target.value)} />
        <FormField id={`edu-grade-${index}`} label="Grade / Details (Optional)" value={item.grade || ''} onChange={(e) => handleChange('grade', e.target.value)} />
      </div>
    );
  }, []);

  const generateNewEducationItem = useCallback(() => ({
    id: `edu-${Date.now()}`,
    degree: '',
    institution: '',
    period: '',
    grade: '',
  }), []);

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Education Background"
        description="Manage your academic qualifications."
      >
        <ArrayManager
          items={portfolioData.education}
          setItems={setEducation}
          renderItem={renderEducationItem}
          generateNewItem={generateNewEducationItem}
          itemTypeName="Education Entry"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
