
"use client";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { ArrayManager } from '@/components/admin/ArrayManager';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { CommunityEntry, CertificationEntry } from '@/lib/portfolio-data-types';

export default function AdminCommunityCertsPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading editor...</p></AdminLayout>;
  }

  const setCommunityInvolvement = (newEntries: CommunityEntry[]) => {
    updatePortfolioData(prev => ({ ...prev!, communityInvolvement: newEntries }));
  };

  const setCertifications = (newEntries: CertificationEntry[]) => {
    updatePortfolioData(prev => ({ ...prev!, certifications: newEntries }));
  };

  const renderCommunityItem = (
    item: CommunityEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<CommunityEntry>) => void
  ) => (
    <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
      <FormField id={`comm-name-${index}`} label="Community/Organization Name" value={item.name} onChange={(e) => onChange(index, { name: e.target.value })} />
      <FormField id={`comm-role-${index}`} label="Your Role (Optional, e.g., Member, Contributor)" value={item.role || ''} onChange={(e) => onChange(index, { role: e.target.value })} />
    </div>
  );

  const renderCertificationItem = (
    item: CertificationEntry,
    index: number,
    onChange: (index: number, updatedItem: Partial<CertificationEntry>) => void
  ) => (
     <div className="space-y-4 p-2 rounded-md border bg-card-muted/20">
      <FormField id={`cert-name-${index}`} label="Certification Name" value={item.name} onChange={(e) => onChange(index, { name: e.target.value })} />
      <FormField id={`cert-issuer-${index}`} label="Issuing Organization (Optional)" value={item.issuer || ''} onChange={(e) => onChange(index, { issuer: e.target.value })} />
      <FormField id={`cert-date-${index}`} label="Date Issued (Optional)" value={item.date || ''} onChange={(e) => onChange(index, { date: e.target.value })} />
    </div>
  );

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="Community Involvement & Certifications"
        description="Manage your community engagements and professional certifications."
      >
        <div>
          <h3 className="text-xl font-semibold mb-3">Community Involvement</h3>
          <ArrayManager
            items={portfolioData.communityInvolvement}
            setItems={setCommunityInvolvement}
            renderItem={renderCommunityItem}
            generateNewItem={() => ({ id: `comm-${Date.now()}`, name: '', role: '' })}
            itemTypeName="Community Entry"
          />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Certifications</h3>
          <ArrayManager
            items={portfolioData.certifications}
            setItems={setCertifications}
            renderItem={renderCertificationItem}
            generateNewItem={() => ({ id: `cert-${Date.now()}`, name: '', issuer: '', date: '' })}
            itemTypeName="Certification"
          />
        </div>
      </EditableSectionWrapper>
    </AdminLayout>
  );
}
