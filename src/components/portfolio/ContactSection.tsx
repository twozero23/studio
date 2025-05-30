
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Mail, Linkedin, Link as LinkIcon, Phone, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NextLink from 'next/link'; // Renamed to avoid conflict with LinkIcon

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
            <ContactItem icon={LinkIcon} text="Linktree" href={contact.linktree} ariaLabel="Nauman Mehdi's Linktree"/>
            {contact.phone && <ContactItem icon={Phone} text={contact.phone} href={`tel:${contact.phone}`} ariaLabel="Call Nauman Mehdi"/>}
            {contact.github && <ContactItem icon={Github} text="GitHub Profile" href={`https://${contact.github}`} ariaLabel="Nauman Mehdi's GitHub Profile"/>}
          </div>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
