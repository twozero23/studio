
"use client";
import Link from 'next/link';
import { Home, Edit3, Palette, Save, Eye, AlertTriangle, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/components/AppProviders';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import React, { useCallback } from 'react'; // Added useCallback

const AdminNavLinks = [
  { href: '/admin', label: 'Dashboard Home', icon: Home },
  { href: '/admin/general', label: 'General Info', icon: Edit3 },
  { href: '/admin/experience', label: 'Experience', icon: Edit3 },
  { href: '/admin/skills', label: 'Skills', icon: Edit3 },
  { href: '/admin/projects', label: 'Projects', icon: Edit3 },
  { href: '/admin/achievements', label: 'Achievements', icon: Edit3 },
  { href: '/admin/community', label: 'Community & Certs', icon: Edit3 },
  { href: '/admin/education', label: 'Education', icon: Edit3 },
  { href: '/admin/custom-sections', label: 'Custom Sections', icon: Edit3 },
  { href: '/admin/theme', label: 'Theme & Appearance', icon: Palette },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { portfolioData, resetPortfolioData } = useAppContext(); // portfolioData might not be needed here directly
  const { toast } = useToast();

  const handleSaveChanges = useCallback(() => {
    // Data is saved on change by usePortfolioData hook, this is more for UX feedback
    toast({
      title: "Changes Saved",
      description: "Your portfolio data has been updated in local storage.",
      variant: "default",
    });
  }, [toast]);
  
  const handleResetData = useCallback(() => {
    resetPortfolioData();
    toast({
      title: "Data Reset",
      description: "Portfolio data has been reset to defaults.",
      variant: "default",
    });
  }, [resetPortfolioData, toast]);

  const handleLogout = useCallback(async () => { // useCallback for consistency, though not strictly necessary here
    router.push('/api/auth/logout');
  }, [router]);


  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold text-primary">
            <Palette className="h-6 w-6" />
            <span>Resume Studio Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-4 text-sm font-medium">
          {AdminNavLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                pathname === link.href && "bg-primary/10 text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <Separator />
         <div className="p-4 space-y-2">
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your customized portfolio data from local storage and reset it to the default content.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetData} className="bg-destructive hover:bg-destructive/90">
                  Yes, reset data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-72 flex-1"> {/* Added pl-72 for sidebar width */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile Nav Trigger could go here if needed */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/" target="_blank">
                <Eye className="mr-2 h-4 w-4" /> Preview Portfolio
              </Link>
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
             <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">
          {/* Removed conditional rendering based on portfolioData for children, 
             assuming auth check happens before this layout is fully rendered or children handle their own loading.
             If children depend on portfolioData, that should be handled within them or passed down.
             The original loading state was for portfolioData, not auth state. */}
          {children}
        </main>
      </div>
    </div>
  );
};
