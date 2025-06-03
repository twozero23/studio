
"use client";
import React, { useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { CommunityEntry, CertificationEntry } from '@/lib/portfolio-data-types';

export default function AdminCommunityCertsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const setCommunityInvolvement = useCallback((newEntries: CommunityEntry[]) => {
    updatePortfolioData(prev => {
      if (!prev) return { ...prev!, communityInvolvement: newEntries };
      return { ...prev, communityInvolvement: newEntries };
    });
  }, [updatePortfolioData]);

  const setCertifications = useCallback((newEntries: CertificationEntry[]) => {
    updatePortfolioData(prev => {
      if (!prev) return { ...prev!, certifications: newEntries };
      return { ...prev, certifications: newEntries };
    });
  }, [updatePortfolioData]);

  const renderCommunityItem = useCallback((
    item: CommunityEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<CommunityEntry>) => void
  ) => (
    <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
      <FormField id={`comm-name-${index}`} label="Community/Organization Name" value={item.name} onChange={(e) => onChange(index, { name: e.target.value })} />
      <FormField id={`comm-role-${index}`} label="Your Role (Optional, e.g., Member, Contributor)" value={item.role || ''} onChange={(e) => onChange(index, { role: e.target.value })} />
    </div>
  ), []);

  const generateNewCommunityItem = useCallback(() => ({ id: `comm-${Date.now()}`, name: '', role: '' }), []);

  const renderCertificationItem = useCallback((
    item: CertificationEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<CertificationEntry>) => void
  ) => (
     <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
      <FormField id={`cert-name-${index}`} label="Certification Name" value={item.name} onChange={(e) => onChange(index, { name: e.target.value })} />
      <FormField id={`cert-issuer-${index}`} label="Issuing Organization (Optional)" value={item.issuer || ''} onChange={(e) => onChange(index, { issuer: e.target.value })} />
      <FormField id={`cert-date-${index}`} label="Date Issued (Optional)" value={item.date || ''} onChange={(e) => onChange(index, { date: e.target.value })} />
    </div>
  ), []);
  
  const generateNewCertificationItem = useCallback(() => ({ id: `cert-${Date.now()}`, name: '', issuer: '', date: '' }), []);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading editor...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Community Involvement & Certifications"
        description="Manage your community engagements and professional certifications."
      >
        <div>
          <h3 className="text-xl font-semibold mb-3">Community Involvement</h3>
          <ArrayManager
            items={portfolioData.communityInvolvement || []}
            setItems={setCommunityInvolvement}
            renderItem={renderCommunityItem}
            generateNewItem={generateNewCommunityItem}
            itemTypeName="Community Entry"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Certifications</h3>
          <ArrayManager
            items={portfolioData.certifications || []}
            setItems={setCertifications}
            renderItem={renderCertificationItem}
            generateNewItem={generateNewCertificationItem}
            itemTypeName="Certification"
          />
        </div>
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
