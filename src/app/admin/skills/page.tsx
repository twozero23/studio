"use client";
import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { Skill } from '@/lib/portfolio-data-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const AdminLayout = dynamic(
  () => import('@/components/admin/AdminLayout').then(mod => mod.AdminLayout),
  { ssr: false }
);

const SKILL_CATEGORIES = [
  'Blockchain & Web3',
  'Product Management',
  'Digital Transformation',
  'Other Technical'
];

export default function AdminSkillsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setSkills = useCallback((skillType: 'technical' | 'tools' | 'soft', newSkills: Skill[]) => {
    updatePortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillType]: newSkills,
      },
    }));
  }, [updatePortfolioData]);

  const renderTechnicalSkillItem = useCallback((
    item: Skill,
    index: number,
    onChange: (index: number, updatedItem: Partial<Skill>) => void
  ) => {
    const handleChange = (field: keyof Skill, value: string | number | undefined) => {
      onChange(index, { [field]: value });
    };
    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`skill-name-technical-${index}`} label="Skill Name" value={item.name} onChange={(e) => handleChange('name', e.target.value)} />
        <div>
          <Label htmlFor={`skill-category-${index}`} className="font-medium">Category</Label>
          <Select
            value={item.category || ''}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger id={`skill-category-${index}`} className="w-full bg-background">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {SKILL_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }, []);

  const renderGenericSkillItem = useCallback((
    skillType: 'tools' | 'soft',
    item: Skill,
    index: number,
    onChange: (index: number, updatedItem: Partial<Skill>) => void
  ) => {
    const handleChange = (field: keyof Skill, value: string | number | undefined) => {
      onChange(index, { [field]: value });
    };
    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`skill-name-${skillType}-${index}`} label="Skill Name" value={item.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
    );
  }, []);

  const generateNewTechnicalSkill = useCallback(() => ({ id: `techskill-${Date.now()}`, name: '', category: SKILL_CATEGORIES[0] }), []);
  const generateNewToolSkill = useCallback(() => ({ id: `toolskill-${Date.now()}`, name: '' }), []);
  const generateNewSoftSkill = useCallback(() => ({ id: `softskill-${Date.now()}`, name: '' }), []);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading skills editor...</p></AdminLayout>;
  }
  
  const technicalSkills = portfolioData.skills?.technical || [];
  const toolSkills = portfolioData.skills?.tools || [];
  const softSkills = portfolioData.skills?.soft || [];

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Skills & Expertise"
        description="Manage your technical, tool-specific, and soft skills."
      >
        <div>
          <h3 className="text-xl font-semibold mb-3">Technical Skills</h3>
          <ArrayManager
            items={technicalSkills}
            setItems={(newSkills) => setSkills('technical', newSkills)}
            renderItem={renderTechnicalSkillItem}
            generateNewItem={generateNewTechnicalSkill}
            itemTypeName="Technical Skill"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Technical Tools</h3>
          <ArrayManager
            items={toolSkills}
            setItems={(newSkills) => setSkills('tools', newSkills)}
            renderItem={(item, index, onChange) => renderGenericSkillItem('tools', item, index, onChange)}
            generateNewItem={generateNewToolSkill}
            itemTypeName="Tool"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Soft Skills</h3>
          <ArrayManager
            items={softSkills}
            setItems={(newSkills) => setSkills('soft', newSkills)}
            renderItem={(item, index, onChange) => renderGenericSkillItem('soft', item, index, onChange)}
            generateNewItem={generateNewSoftSkill}
            itemTypeName="Soft Skill"
          />
        </div>
      </EditableSectionWrapper>
    </AdminLayout>
  );
}