
"use client";
import { useAppContext } from '@/components/AppProviders';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export const PortfolioFooter = () => {
  const { portfolioData, isLoading } = useAppContext();
  const currentYear = new Date().getFullYear();

  const name = isLoading || !portfolioData ? "Your Name" : portfolioData.name;

  return (
    <footer className="bg-secondary text-muted-foreground py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm mb-2">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
        <p className="text-xs">
          Built with Next.js and Tailwind CSS.
        </p>
        <div className="mt-4">
          <Link href="/admin" className="text-xs hover:text-primary transition-colors inline-flex items-center gap-1">
            <Settings className="h-3 w-3" /> Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};
