"use client";
import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager'; 
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { CustomSectionEntry, CustomField } from '@/lib/portfolio-data-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

const AdminLayout = dynamic(
  () => import('@/components/admin/AdminLayout').then(mod => mod.AdminLayout),
  { ssr: false }
);

export default function AdminCustomSectionsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setCustomSections = useCallback((newSections: CustomSectionEntry[]) => {
    updatePortfolioData(prev => ({ ...prev, customSections: newSections }));
  }, [updatePortfolioData]);

  const renderCustomField = useCallback((
    sectionIndex: number,
    field: CustomField,
    fieldIndex: number,
    onFieldChange: (sectionIndex: number, fieldIndex: number, updatedField: Partial<CustomField>) => void,
    onRemoveField: (sectionIndex: number, fieldIndex: number) => void
  ) => (
    <div key={field.id} className="flex items-end gap-2 p-2 border rounded bg-muted/20">
      <FormField
        id={`custom-field-key-${sectionIndex}-${fieldIndex}`}
        label="Field Label"
        value={field.key}
        onChange={(e) => onFieldChange(sectionIndex, fieldIndex, { key: e.target.value })}
        placeholder="e.g., Award Name"
      />
      <FormField
        id={`custom-field-value-${sectionIndex}-${fieldIndex}`}
        label="Field Value"
        value={field.value}
        onChange={(e) => onFieldChange(sectionIndex, fieldIndex, { value: e.target.value })}
        placeholder="e.g., Best Innovator 2023"
      />
      <Button variant="ghost" size="icon" onClick={() => onRemoveField(sectionIndex, fieldIndex)} aria-label="Remove field">
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  ), []);

  const renderCustomSectionItem = useCallback((
    item: CustomSectionEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<CustomSectionEntry>) => void
  ) => {
    const handleSectionTitleChange = (value: string) => {
      onChange(index, { title: value });
    };

    const handleFieldChange = (fieldIndex: number, updatedField: Partial<CustomField>) => {
      const updatedItems = [...(item.items || [])]; 
      updatedItems[fieldIndex] = { ...updatedItems[fieldIndex], ...updatedField };
      onChange(index, { items: updatedItems });
    };

    const handleAddField = () => {
      const newField: CustomField = { id: `field-${Date.now()}`, key: '', value: '' };
      onChange(index, { items: [...(item.items || []), newField] });
    };

    const handleRemoveField = (fieldIndex: number) => {
      const filteredItems = (item.items || []).filter((_, idx) => idx !== fieldIndex);
      onChange(index, { items: filteredItems });
    };

    return (
      <div className="space-y-4 p-4 rounded-md border bg-card">
        <FormField
          id={`custom-section-title-${index}`}
          label="Section Title"
          value={item.title}
          onChange={(e) => handleSectionTitleChange(e.target.value)}
          placeholder="e.g., Awards & Recognitions"
        />
        <div>
          <Label className="font-medium mb-2 block">Fields in this section:</Label>
          <div className="space-y-3">
            {(item.items || []).map((field, fieldIndex) =>
              renderCustomField(index, field, fieldIndex, 
                (_sIdx, fIdx, uField) => handleFieldChange(fIdx, uField), 
                (_sIdx, fIdx) => handleRemoveField(fIdx)
              )
            )}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleAddField} className="mt-3">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Field to this Section
          </Button>
        </div>
      </div>
    );
  }, [renderCustomField]);

  const generateNewCustomSectionItem = useCallback(() => ({
    id: `custom-section-${Date.now()}`,
    title: '',
    items: [{ id: `field-${Date.now()}`, key: '', value: '' }],
  }), []);
  
  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading custom sections editor...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Custom Sections"
        description="Add and manage custom sections with key-value pairs for your portfolio (e.g., Hobbies, Awards, Languages)."
      >
        <ArrayManager
          items={portfolioData.customSections || []}
          setItems={setCustomSections}
          renderItem={renderCustomSectionItem}
          generateNewItem={generateNewCustomSectionItem}
          itemTypeName="Custom Section"
        />
      </EditableSectionWrapper>
    </AdminLayout>
  );
}