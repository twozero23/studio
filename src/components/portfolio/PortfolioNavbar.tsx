
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react'; 
import { useAppContext } from '@/components/AppProviders';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const NavLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Impact' },
  { href: '#contact', label: 'Contact' },
];

export const PortfolioNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { portfolioData } = useAppContext();

  const name = portfolioData?.name || "Portfolio";
  const initials = portfolioData?.profilePictureInitials || "P";
  const profilePictureUrl = portfolioData?.theme?.profilePictureUrl;


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled || isOpen ? 'bg-background/80 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="flex items-center gap-2 text-xl font-bold transition-colors duration-200 ease-out hover:text-primary" style={{ color: 'hsl(var(--primary))' }}>
          {profilePictureUrl ? (
            <Image src={profilePictureUrl} alt={name} width={36} height={36} className="rounded-full border-2 border-primary" data-ai-hint="profile avatar"/>
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              {initials}
            </div>
          )}
          <span className="hidden sm:inline">{name}</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {NavLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild className="text-foreground transition-colors duration-200 ease-out hover:text-primary hover:bg-primary/10">
              <Link href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                {link.label}
              </Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-2 pt-2">
            {NavLinks.map((link) => (
              <Button key={link.label} variant="ghost" asChild className="w-full justify-start text-foreground transition-colors duration-200 ease-out hover:text-primary hover:bg-primary/10">
                <Link href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
