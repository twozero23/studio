
"use client";
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit3, Palette, ExternalLink, FileText } from 'lucide-react';
import { useAppContext } from '@/components/AppProviders';
import { generateResumePdf } from '@/lib/resume-generator';
import { useToast } from '@/hooks/use-toast';
import React from 'react';


export default function AdminDashboardPage() {
  const { portfolioData, isLoading } = useAppContext();
  const { toast } = useToast();

  const handleGenerateResume = () => {
    if (!portfolioData) {
      toast({
        title: "Error",
        description: "Portfolio data is not loaded yet. Please wait and try again.",
        variant: "destructive",
      });
      return;
    }
    try {
      generateResumePdf(portfolioData);
      toast({
        title: "Resume Generated",
        description: "Your PDF resume has started downloading.",
      });
    } catch (error) {
      console.error("Failed to generate resume PDF:", error);
      toast({
        title: "Resume Generation Failed",
        description: "An error occurred while trying to generate the PDF. Check console for details.",
        variant: "destructive",
      });
    }
  };


  return (
    <AdminLayout>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Your Portfolio Dashboard</CardTitle>
          <CardDescription>
            Manage and customize your professional portfolio content and appearance from here.
            All changes are saved locally in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/general" passHref>
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <Edit3 className="mr-2 h-5 w-5 text-primary" />
                  <div>
                    <span className="font-medium">Edit General Info</span>
                    <p className="text-xs text-muted-foreground">Update your name, title, summary, etc.</p>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/experience" passHref>
                 <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <Edit3 className="mr-2 h-5 w-5 text-primary" />
                   <div>
                    <span className="font-medium">Manage Experience</span>
                    <p className="text-xs text-muted-foreground">Add or edit job roles.</p>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/theme" passHref>
                 <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <Palette className="mr-2 h-5 w-5 text-primary" />
                   <div>
                    <span className="font-medium">Customize Appearance</span>
                    <p className="text-xs text-muted-foreground">Change accent color and font.</p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Tools</h3>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGenerateResume} disabled={isLoading}>
                  <FileText className="mr-2 h-4 w-4" /> Generate ATS-Friendly Resume (PDF)
                </Button>
                <Link href="/" target="_blank" passHref>
                  <Button>
                    View Live Portfolio <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Generate a downloadable PDF resume based on your current portfolio data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Important Note</h3>
            <p className="text-sm text-muted-foreground">
              Since all data is stored in your browser's local storage, these changes will only be visible on this device and browser.
              Clearing your browser data may remove your customizations. For a live, shared portfolio, you would typically deploy these changes to a web server.
            </p>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
