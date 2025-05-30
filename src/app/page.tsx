
import { PortfolioNavbar } from '@/components/portfolio/PortfolioNavbar';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { AchievementsSection } from '@/components/portfolio/AchievementsSection';
import { CommunityAndCertificationsSection } from '@/components/portfolio/CommunityAndCertificationsSection';
import { EducationSection } from '@/components/portfolio/EducationSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { CustomSectionsDisplay } from '@/components/portfolio/CustomSectionsDisplay';


export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PortfolioNavbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CommunityAndCertificationsSection />
        <EducationSection />
        <CustomSectionsDisplay />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
