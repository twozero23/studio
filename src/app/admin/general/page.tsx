"use client";
import dynamic from 'next/dynamic';
import { EditableSectionWrapper } from '@/components/admin/EditableSectionWrapper';
import { FormFieldComponent as FormField } from '@/components/admin/FormField';
import { useAppContext } from '@/components/AppProviders';
import type { PortfolioData, ContactInfo } from '@/lib/portfolio-data-types';
import React, { useCallback } from 'react'; 

const AdminLayout = dynamic(
  () => import('@/components/admin/AdminLayout').then(mod => mod.AdminLayout),
  { ssr: false }
);

export default function AdminGeneralPage() {
  const { portfolioData, updatePortfolioData, isLoading } = useAppContext();

  const handleChange = useCallback((field: keyof PortfolioData, value: string) => {
    updatePortfolioData(prev => ({ ...prev, [field]: value }));
  }, [updatePortfolioData]);

  const handleContactChange = useCallback((field: keyof ContactInfo, value: string) => {
    updatePortfolioData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  }, [updatePortfolioData]);
  
  const handleProfilePictureInitialsChange = useCallback((value: string) => {
    updatePortfolioData(prev => ({ ...prev, profilePictureInitials: value.substring(0,2).toUpperCase() }));
  }, [updatePortfolioData]);

  if (isLoading || !portfolioData) {
    return <AdminLayout><p>Loading general settings...</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <EditableSectionWrapper
        title="General Information"
        description="Update your main profile details, summary, and contact information."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="name"
            label="Full Name"
            value={portfolioData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <FormField
            id="title"
            label="Professional Title / Headline"
            value={portfolioData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <FormField
          id="tagline"
          label="Tagline"
          type="textarea"
          value={portfolioData.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          description="A short, catchy phrase that describes you."
        />
        
        <FormField
          id="profilePictureInitials"
          label="Profile Picture Initials (Max 2 chars)"
          value={portfolioData.profilePictureInitials}
          onChange={(e) => handleProfilePictureInitialsChange(e.target.value)}
          description="Initials to display if no profile picture URL is set. Will be uppercased."
        />

        <FormField
          id="summary"
          label="Summary"
          type="textarea"
          rows={4}
          value={portfolioData.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          description="A brief overview used in your portfolio. This might be the first paragraph of your 'About Me' or a concise professional statement."
        />

        <FormField
          id="aboutMe"
          label="About Me (Detailed)"
          type="textarea"
          rows={6}
          value={portfolioData.aboutMe}
          onChange={(e) => handleChange('aboutMe', e.target.value)}
          description="A more comprehensive narrative about your journey, passion, and value proposition."
        />

        <h3 className="text-lg font-semibold border-t pt-6 mt-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={portfolioData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
          />
          <FormField
            id="linkedin"
            label="LinkedIn Profile URL (e.g., linkedin.com/in/username)"
            type="url"
            value={portfolioData.contact.linkedin}
            onChange={(e) => handleContactChange('linkedin', e.target.value)}
          />
          <FormField
            id="linktree"
            label="Linktree URL (or other links collection)"
            type="url"
            value={portfolioData.contact.linktree}
            onChange={(e) => handleContactChange('linktree', e.target.value)}
          />
          <FormField
            id="phone"
            label="Phone Number (Optional)"
            type="text"
            value={portfolioData.contact.phone || ''}
            onChange={(e) => handleContactChange('phone', e.target.value)}
          />
           <FormField
            id="github"
            label="GitHub Profile URL (e.g., github.com/username, Optional)"
            type="url"
            value={portfolioData.contact.github || ''}
            onChange={(e) => handleContactChange('github', e.target.value)}
          />
          <FormField
            id="x"
            label="X (Twitter) Profile URL (Optional)"
            type="url"
            value={portfolioData.contact.x || ''}
            onChange={(e) => handleContactChange('x', e.target.value)}
            placeholder="https://x.com/username"
          />
          <FormField
            id="farcaster"
            label="Farcaster Profile URL (Optional)"
            type="url"
            value={portfolioData.contact.farcaster || ''}
            onChange={(e) => handleContactChange('farcaster', e.target.value)}
            placeholder="https://warpcast.com/username"
          />
          <FormField
            id="poap"
            label="POAP Profile URL (Optional)"
            type="url"
            value={portfolioData.contact.poap || ''}
            onChange={(e) => handleContactChange('poap', e.target.value)}
            placeholder="https://app.poap.xyz/user/address_or_ens"
          />
        </div>
      </EditableSectionWrapper>
    </AdminLayout>
  );
}