
"use client";
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/AppProviders';
import Link from 'next/link';
import { Linkedin, ArrowDownCircle } from 'lucide-react';
import Image from 'next/image';

export const HeroSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <section id="hero" className="h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="text-center p-6">
          <div className="animate-pulse h-12 w-72 bg-muted rounded-md mx-auto mb-4"></div>
          <div className="animate-pulse h-8 w-96 bg-muted rounded-md mx-auto mb-6"></div>
          <div className="animate-pulse h-6 w-80 bg-muted rounded-md mx-auto mb-8"></div>
          <div className="animate-pulse h-12 w-40 bg-muted rounded-md mx-auto"></div>
        </div>
      </section>
    );
  }

  const { name, title, tagline, contact, profilePictureInitials, theme } = portfolioData;
  const profilePictureUrl = theme?.profilePictureUrl;


  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-foreground py-10">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div 
          className="mb-8 flex justify-center animated-item animate-fadeInUp" 
          style={{ animationDelay: '0.1s' }}
        >
          {profilePictureUrl ? (
            <Image 
              src={profilePictureUrl} 
              alt={name} 
              width={160} 
              height={160} 
              className="rounded-full shadow-xl border-4 border-primary"
              data-ai-hint="professional headshot" 
              priority
            />
          ) : (
            <div 
              className="w-40 h-40 rounded-full bg-primary flex items-center justify-center text-5xl font-bold text-primary-foreground shadow-xl border-4 border-primary-foreground/50"
              aria-label={name}
            >
              {profilePictureInitials}
            </div>
          )}
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight animated-item animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="block ">{name}</span>
        </h1>
        <p 
          className="text-xl sm:text-2xl md:text-3xl text-primary font-medium mb-6 animated-item animate-fadeInUp" 
          style={{ color: 'hsl(var(--primary))', animationDelay: '0.5s' }}
        >
          {title}
        </p>
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animated-item animate-fadeInUp"
          style={{ animationDelay: '0.7s' }}
        >
          {tagline}
        </p>
        <div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 animated-item animate-fadeInUp"
          style={{ animationDelay: '0.9s' }}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300" asChild>
            <Link href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg hover:shadow-xl transition-shadow duration-300" asChild>
            <Link href="#contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#about" onClick={handleScrollToAbout} aria-label="Scroll to about section" className="group">
          <ArrowDownCircle className="h-10 w-10 text-primary animate-subtleBounce group-hover:scale-110 transition-transform duration-200" style={{ color: 'hsl(var(--primary))' }}/>
        </Link>
      </div>
    </section>
  );
};
