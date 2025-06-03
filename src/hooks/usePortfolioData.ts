
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData, PortfolioTheme } from '@/lib/portfolio-data-types';
import { defaultPortfolioData } from '@/lib/default-portfolio-data';

const LOCAL_STORAGE_KEY = 'portfolioData';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData); // Type 'any' for merging flexibility

        // Helper to ensure a property is an array, or use the default
        const ensureArray = (parsedValue: unknown, defaultArr: any[]) => {
          return Array.isArray(parsedValue) ? parsedValue : defaultArr;
        };
        
        // Helper for the nested skills object
        const ensureSkillsStructure = (parsedSkills: any) => {
            const defaultSkills = defaultPortfolioData.skills;
            if (!parsedSkills || typeof parsedSkills !== 'object') {
                return defaultSkills; // Return the entire default skills object if parsedSkills is invalid
            }
            return {
                technical: ensureArray(parsedSkills.technical, defaultSkills.technical),
                soft: ensureArray(parsedSkills.soft, defaultSkills.soft),
                tools: ensureArray(parsedSkills.tools, defaultSkills.tools),
            };
        };

        const mergedData: PortfolioData = {
          // Spreading defaultPortfolioData first ensures all keys are present
          ...defaultPortfolioData,
          // Overwrite with parsedData values if they exist and are valid
          name: parsedData.name || defaultPortfolioData.name,
          title: parsedData.title || defaultPortfolioData.title,
          tagline: parsedData.tagline || defaultPortfolioData.tagline,
          profilePictureInitials: parsedData.profilePictureInitials || defaultPortfolioData.profilePictureInitials,
          contact: {
            ...defaultPortfolioData.contact,
            ...(parsedData.contact || {}), // Merge contact info
          },
          summary: parsedData.summary || defaultPortfolioData.summary,
          aboutMe: parsedData.aboutMe || defaultPortfolioData.aboutMe,
          
          // Ensure all array fields are correctly typed or fall back to default empty arrays
          experience: ensureArray(parsedData.experience, defaultPortfolioData.experience),
          skills: ensureSkillsStructure(parsedData.skills),
          projects: ensureArray(parsedData.projects, defaultPortfolioData.projects),
          achievements: ensureArray(parsedData.achievements, defaultPortfolioData.achievements),
          communityInvolvement: ensureArray(parsedData.communityInvolvement, defaultPortfolioData.communityInvolvement),
          certifications: ensureArray(parsedData.certifications, defaultPortfolioData.certifications),
          education: ensureArray(parsedData.education, defaultPortfolioData.education),
          customSections: ensureArray(parsedData.customSections, defaultPortfolioData.customSections),

          theme: { // Theme values also need careful merging/defaulting
            ...defaultPortfolioData.theme,
            ...(parsedData.theme || {}), // Merge theme info
            accentColor: parsedData.theme?.accentColor || defaultPortfolioData.theme.accentColor,
            font: parsedData.theme?.font || defaultPortfolioData.theme.font,
            mode: parsedData.theme?.mode || defaultPortfolioData.theme.mode,
            profilePictureUrl: parsedData.theme?.profilePictureUrl || defaultPortfolioData.theme.profilePictureUrl,
          },
        };
        setPortfolioData(mergedData);
      } else {
        setPortfolioData(defaultPortfolioData);
      }
    } catch (error) {
      console.error("Failed to load or merge portfolio data from localStorage. Resetting to defaults. Error:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear potentially corrupt data
      setPortfolioData(defaultPortfolioData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePortfolioData = useCallback(
    (newDataOrFn: Partial<PortfolioData> | ((prevData: PortfolioData) => PortfolioData)) => {
      setPortfolioData(currentInternalState => {
        const baseData = currentInternalState ?? defaultPortfolioData;
        let newCalculatedState: PortfolioData;

        if (typeof newDataOrFn === 'function') {
          newCalculatedState = newDataOrFn(baseData);
        } else {
          newCalculatedState = { ...baseData, ...newDataOrFn };
        }

        // Final check to ensure critical array fields are indeed arrays before saving
        // This acts as a safeguard if newCalculatedState somehow got corrupted arrays.
        const finalState: PortfolioData = {
            ...newCalculatedState,
            experience: Array.isArray(newCalculatedState.experience) ? newCalculatedState.experience : defaultPortfolioData.experience,
            skills: {
                technical: Array.isArray(newCalculatedState.skills?.technical) ? newCalculatedState.skills.technical : defaultPortfolioData.skills.technical,
                soft: Array.isArray(newCalculatedState.skills?.soft) ? newCalculatedState.skills.soft : defaultPortfolioData.skills.soft,
                tools: Array.isArray(newCalculatedState.skills?.tools) ? newCalculatedState.skills.tools : defaultPortfolioData.skills.tools,
            },
            projects: Array.isArray(newCalculatedState.projects) ? newCalculatedState.projects : defaultPortfolioData.projects,
            achievements: Array.isArray(newCalculatedState.achievements) ? newCalculatedState.achievements : defaultPortfolioData.achievements,
            communityInvolvement: Array.isArray(newCalculatedState.communityInvolvement) ? newCalculatedState.communityInvolvement : defaultPortfolioData.communityInvolvement,
            certifications: Array.isArray(newCalculatedState.certifications) ? newCalculatedState.certifications : defaultPortfolioData.certifications,
            education: Array.isArray(newCalculatedState.education) ? newCalculatedState.education : defaultPortfolioData.education,
            customSections: Array.isArray(newCalculatedState.customSections) ? newCalculatedState.customSections : defaultPortfolioData.customSections,
        };

        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalState));
        } catch (error) {
          console.error("Failed to save portfolio data to localStorage:", error);
        }
        return finalState;
      });
    },
    []
  );
  
  const updateTheme = useCallback(
    (newThemeOrFn: Partial<PortfolioTheme> | ((prevTheme: PortfolioTheme) => PortfolioTheme)) => {
      setPortfolioData(currentInternalState => {
        const basePortfolioData = currentInternalState ?? defaultPortfolioData;
        const baseTheme = basePortfolioData.theme; 

        let newCalculatedTheme: PortfolioTheme;
        if (typeof newThemeOrFn === 'function') {
          newCalculatedTheme = newThemeOrFn(baseTheme);
        } else {
          newCalculatedTheme = { ...baseTheme, ...newThemeOrFn };
        }

        const newPortfolioState = { ...basePortfolioData, theme: newCalculatedTheme };
        
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPortfolioState));
        } catch (error) {
          console.error("Failed to save theme data to localStorage:", error);
        }
        return newPortfolioState;
      });
    },
    []
  );

  const resetPortfolioData = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setPortfolioData(defaultPortfolioData);
  }, []);

  return { portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData };
};
