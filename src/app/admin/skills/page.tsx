
"use client";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { Skill } from '@/lib/portfolio-data-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const SKILL_CATEGORIES = [
  'Blockchain & Web3',
  'Product Management',
  'Digital Transformation',
  'Other Technical'
];

export default function AdminSkillsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading skills editor...</p></AdminLayout>;
  }

  const setSkills = (skillType: 'technical' | 'tools' | 'soft', newSkills: Skill[]) => {
    updatePortfolioData(prev => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        [skillType]: newSkills,
      },
    }));
  };

  const renderSkillItem = (
    skillType: 'technical' | 'tools' | 'soft',
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
        {skillType === 'technical' && (
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
        )}
         {/* Optional: Add proficiency level field if needed later */}
         {/* <FormField id={`skill-level-${index}`} label="Proficiency (1-5, Optional)" type="number" value={item.level || ''} onChange={(e) => handleChange('level', parseInt(e.target.value) || undefined)} /> */}
      </div>
    );
  };

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Skills & Expertise"
        description="Manage your technical, tool-specific, and soft skills."
      >
        <div>
          <h3 className="text-xl font-semibold mb-3">Technical Skills</h3>
          <ArrayManager
            items={portfolioData.skills.technical}
            setItems={(newSkills) => setSkills('technical', newSkills)}
            renderItem={(item, index, onChange) => renderSkillItem('technical', item, index, onChange)}
            generateNewItem={() => ({ id: `techskill-${Date.now()}`, name: '', category: SKILL_CATEGORIES[0] })}
            itemTypeName="Technical Skill"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Technical Tools</h3>
          <ArrayManager
            items={portfolioData.skills.tools}
            setItems={(newSkills) => setSkills('tools', newSkills)}
            renderItem={(item, index, onChange) => renderSkillItem('tools',item, index, onChange)}
            generateNewItem={() => ({ id: `toolskill-${Date.now()}`, name: '' })}
            itemTypeName="Tool"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Soft Skills</h3>
          <ArrayManager
            items={portfolioData.skills.soft}
            setItems={(newSkills) => setSkills('soft', newSkills)}
            renderItem={(item, index, onChange) => renderSkillItem('soft', item, index, onChange)}
            generateNewItem={() => ({ id: `softskill-${Date.now()}`, name: '' })}
            itemTypeName="Soft Skill"
          />
        </div>
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
