
"use client";
import { SectionLayout } from '@/components/SectionLayout';
import { useAppContext } from '@/components/AppProviders';
import { Users, Award as CertificateIcon, CheckIcon } from 'lucide-react'; 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CommunityAndCertificationsSection = () => {
  const { portfolioData, isLoading } = useAppContext();

  if (isLoading || !portfolioData) {
    return (
      <SectionLayout id="community-certs" title="Engagements & Credentials" icon={Users}>
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <Card className="rounded-xl">
            <CardHeader><div className="h-6 bg-muted rounded w-1/2 mb-2"></div></CardHeader>
            <CardContent><div className="h-4 bg-muted rounded w-full"></div></CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardHeader><div className="h-6 bg-muted rounded w-1/2 mb-2"></div></CardHeader>
            <CardContent><div className="h-4 bg-muted rounded w-full"></div></CardContent>
          </Card>
        </div>
      </SectionLayout>
    );
  }

  const { communityInvolvement, certifications } = portfolioData;

  return (
    <SectionLayout id="community-certs" title="Engagements & Credentials" icon={Users}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Community Involvement */}
        <Card className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform">
          <CardHeader className="flex flex-row items-center space-x-3 pb-4">
            <Users className="h-7 w-7 text-primary" style={{ color: 'hsl(var(--primary))' }} />
            <CardTitle className="text-2xl font-semibold text-foreground">Community Involvement</CardTitle>
          </CardHeader>
          <CardContent>
            {communityInvolvement.length > 0 ? (
              <ul className="space-y-2">
                {communityInvolvement.map(item => (
                  <li key={item.id} className="flex items-center">
                    <Badge 
                      variant="outline" 
                      className="text-md py-1 px-3 border-primary/50 text-primary bg-primary/5 transition-all duration-200 ease-out hover:scale-105" 
                      style={{color: 'hsl(var(--primary))', backgroundColor: 'hsl(var(--primary)/0.05)', borderColor: 'hsl(var(--primary)/0.5)'}}
                    >
                      {item.name}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No community involvement listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 transform">
          <CardHeader className="flex flex-row items-center space-x-3 pb-4">
            <CertificateIcon className="h-7 w-7 text-primary" style={{ color: 'hsl(var(--primary))' }} />
            <CardTitle className="text-2xl font-semibold text-foreground">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {certifications.length > 0 ? (
              <ul className="space-y-3">
                {certifications.map(cert => (
                  <li key={cert.id} className="flex items-start text-foreground">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium">{cert.name}</span>
                      {cert.issuer && <span className="block text-xs text-muted-foreground">Issuer: {cert.issuer}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No certifications listed.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  );
};
