
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Mail, Linkedin, Link as LinkIcon, Phone, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NextLink from 'next/link'; // Renamed to avoid conflict with LinkIcon
import type React from 'react';

// Simplified Farcaster Icon Component
const FarcasterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Farcaster</title>
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2ZM9.055 16.954H6.782V7.046h4.546c2.09 0 3.318.982 3.318 2.945 0 1.527-.84 2.4-2.209 2.727l2.527 4.236h-2.5l-2.273-3.954H9.055v3.954Zm0-5.682h1.764c.818 0 1.327-.4 1.327-1.136 0-.736-.509-1.127-1.327-1.127H9.055v2.263Z" fill="currentColor"/>
  </svg>
);

// Simplified POAP Icon Component
const POAPIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>POAP</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13.8c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8zm0-6c-.99 0-1.8.81-1.8 1.8s.81 1.8 1.8 1.8 1.8-.81 1.8-1.8-.81-1.8-1.8-1.8z" fill="currentColor"/>
  </svg>
);


interface ContactItemProps {
  icon: React.ElementType;
  text: string;
  href: string;
  ariaLabel: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, text, href, ariaLabel }) => (
  <Button variant="ghost" asChild className="justify-start text-lg p-4 hover:bg-primary/10 group w-full sm:w-auto">
    <NextLink href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      <Icon className="h-6 w-6 mr-3 text-primary group-hover:scale-110 transition-transform" style={{ color: 'hsl(var(--primary))' }} />
      <span className="text-foreground group-hover:text-primary">{text}</span>
    </NextLink>
  </Button>
);

export const ContactSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="contact" title="Get In Touch" icon={Mail}>
        <div className="animate-pulse max-w-md mx-auto space-y-4">
          <div className="h-10 bg-muted rounded w-full"></div>
          <div className="h-10 bg-muted rounded w-full"></div>
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </SectionLayout>
    );
  }

  const { contact } = portfolioData;

  return (
    <SectionLayout id="contact" title="Let's Connect" icon={Mail}>
      <Card className="max-w-lg mx-auto shadow-xl p-6 md:p-8">
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something transformative. Feel free to reach out!
          </p>
          <div className="flex flex-col items-center space-y-4">
            <ContactItem icon={Mail} text={contact.email} href={`mailto:${contact.email}`} ariaLabel="Email Nauman Mehdi"/>
            <ContactItem icon={Linkedin} text="LinkedIn Profile" href={`https://${contact.linkedin}`} ariaLabel="Nauman Mehdi's LinkedIn Profile"/>
            {contact.github && <ContactItem icon={Github} text="GitHub Profile" href={contact.github.startsWith('http') ? contact.github : `https://${contact.github}`} ariaLabel="Nauman Mehdi's GitHub Profile"/>}
            {contact.x && <ContactItem icon={Twitter} text="X (Twitter)" href={contact.x} ariaLabel="Nauman Mehdi's X Profile"/>}
            {contact.farcaster && <ContactItem icon={FarcasterIcon} text="Farcaster" href={contact.farcaster} ariaLabel="Nauman Mehdi's Farcaster Profile"/>}
            {contact.poap && <ContactItem icon={POAPIcon} text="POAP" href={contact.poap} ariaLabel="Nauman Mehdi's POAP Gallery"/>}
            {contact.linktree && <ContactItem icon={LinkIcon} text="Linktree" href={contact.linktree} ariaLabel="Nauman Mehdi's Linktree"/>}
            {contact.phone && <ContactItem icon={Phone} text={contact.phone} href={`tel:${contact.phone}`} ariaLabel="Call Nauman Mehdi"/>}
          </div>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
