
export interface ContactInfo {
  email: string;
  linkedin: string;
  linktree: string;
  phone?: string; // Optional
  github?: string; // Optional
  x?: string; // Optional - for X (Twitter)
  farcaster?: string; // Optional
  poap?: string; // Optional
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  responsibilities: string[];
  achievements: string[];
  logoUrl?: string; // Optional for company logo (CSS/HTML representation or actual if allowed later)
}

export interface Skill {
  id: string;
  name: string;
  category?: string; // e.g., 'Blockchain & Web3', 'Product Management', 'Soft Skills'
  level?: number; // Optional proficiency level (1-5)
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  role: string;
  highlights: string[];
  technologies?: string[]; // Optional
  imageUrl?: string; // Optional, for a placeholder or image
  projectUrl?: string; // Optional
}

export interface AchievementHighlight {
  id: string;
  metric: string; // e.g., "40%"
  description: string; // e.g., "Productivity Boost"
  icon?: string; // Lucide icon name
}

export interface CommunityEntry {
  id: string;
  name: string;
  role?: string; // Optional, e.g., Member, Contributor
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer?: string; // Optional
  date?: string; // Optional
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string; // Optional
}

export interface CustomField {
  id: string;
  key: string;
  value: string;
}
export interface CustomSectionEntry {
  id: string;
  title: string;
  items: CustomField[];
}

export interface PortfolioTheme {
  accentColor: string; // hex string
  font: string; // Google Font name e.g. 'Roboto'
  // mode: 'light' | 'dark'; // Keeping portfolio light as per spec
  profilePictureUrl?: string; // URL for profile picture
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  profilePictureInitials: string;
  contact: ContactInfo;
  summary: string; // Used for a brief intro or as part of About Me
  aboutMe: string; // More detailed narrative
  experience: ExperienceEntry[];
  skills: {
    technical: Skill[];
    soft: Skill[];
    tools: Skill[];
  };
  projects: ProjectEntry[];
  achievements: AchievementHighlight[];
  communityInvolvement: CommunityEntry[];
  certifications: CertificationEntry[];
  education: EducationEntry[];
  theme: PortfolioTheme;
  customSections: CustomSectionEntry[];
}

export const AVAILABLE_FONTS = [
  { name: 'Geist Sans', value: 'var(--font-geist-sans)' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
] as const;

export type FontOption = typeof AVAILABLE_FONTS[number]['name'];

export const DEFAULT_ACCENT_COLOR = '#F88A78'; // Vibrant Coral (hsl(10, 85%, 65%))
export const DEFAULT_FONT: FontOption = 'Geist Sans';
