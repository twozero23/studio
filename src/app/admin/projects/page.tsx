
"use client";
import React, { useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager, StringListManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { ProjectEntry } from '@/lib/portfolio-data-types';
import { Label } from '@/components/ui/label';

export default function AdminProjectsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setProjects = useCallback((newProjects: ProjectEntry[]) => {
    updatePortfolioData(prev => {
      if (!prev) return { ...prev!, projects: newProjects };
      return { ...prev, projects: newProjects };
    });
  }, [updatePortfolioData]);

  const renderProjectItem = useCallback((
    item: ProjectEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<ProjectEntry>) => void
  ) => {
    const handleChange = (field: keyof ProjectEntry, value: string | string[]) => {
      onChange(index, { [field]: value });
    };

    return (
      <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
        <FormField id={`project-name-${index}`} label="Project Name" value={item.name} onChange={(e) => handleChange('name', e.target.value)} />
        <FormField id={`project-role-${index}`} label="Your Role" value={item.role} onChange={(e) => handleChange('role', e.target.value)} />
        <FormField id={`project-desc-${index}`} label="Description" type="textarea" value={item.description} onChange={(e) => handleChange('description', e.target.value)} />
        <FormField id={`project-imageurl-${index}`} label="Image URL (Optional)" type="url" value={item.imageUrl || ''} onChange={(e) => handleChange('imageUrl', e.target.value)} placeholder="https://example.com/image.png" />
        <FormField id={`project-url-${index}`} label="Project URL (Optional)" type="url" value={item.projectUrl || ''} onChange={(e) => handleChange('projectUrl', e.target.value)} placeholder="https://example.com/project" />

        <div>
          <Label className="font-medium">Highlights</Label>
          <StringListManager
            list={item.highlights || []}
            setList={(newList) => handleChange('highlights', newList)}
            label="Highlight"
          />
        </div>
         <div>
          <Label className="font-medium">Technologies (Optional, comma-separated or one per line via manager)</Label>
          <StringListManager
            list={item.technologies || []}
            setList={(newList) => handleChange('technologies', newList)}
            label="Technology"
          />
        </div>
      </div>
    );
  }, []);

  const generateNewProjectItem = useCallback(() => ({
    id: `proj-${Date.now()}`,
    name: '',
    description: '',
    role: '',
    highlights: [],
    technologies: [],
    imageUrl: '',
    projectUrl: '',
  }), []);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading projects editor...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Projects Showcase"
        description="Manage the projects you want to highlight in your portfolio."
      >
        <ArrayManager
          items={portfolioData.projects || []}
          setItems={setProjects}
          renderItem={renderProjectItem}
          generateNewItem={generateNewProjectItem}
          itemTypeName="Project"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
