
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import type { PortfolioData, PortfolioTheme, FontOption } from '@/lib/portfolio-data-types';
import { AVAILABLE_FONTS, DEFAULT_FONT, DEFAULT_ACCENT_COLOR } from '@/lib/portfolio-data-types';

interface AppContextType {
  portfolioData: PortfolioData | null;
  isLoading: boolean;
  updatePortfolioData: (newData: Partial<PortfolioData> | ((prevData: PortfolioData) => PortfolioData)) => void;
  updateTheme: (newTheme: Partial<PortfolioTheme> | ((prevTheme: PortfolioTheme) => PortfolioTheme)) => void;
  resetPortfolioData: () => void;
  currentFont: FontOption;
  currentAccentColor: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const { portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData } = usePortfolioData();

  const currentFont = portfolioData?.theme?.font || DEFAULT_FONT;
  const currentAccentColor = portfolioData?.theme?.accentColor || DEFAULT_ACCENT_COLOR;

  useEffect(() => {
    if (portfolioData) {
      // Apply font
      const fontPreference = AVAILABLE_FONTS.find(f => f.name === portfolioData.theme.font)?.value || AVAILABLE_FONTS.find(f => f.name === DEFAULT_FONT)?.value;
      document.body.style.fontFamily = fontPreference as string;

      // Apply accent color
      document.documentElement.style.setProperty('--custom-accent', portfolioData.theme.accentColor);
      // Update ShadCN variable if it's distinct or if we want to override default accent
      document.documentElement.style.setProperty('--accent-h', portfolioData.theme.accentColor.match(/hsl\(([^,]+),/)?.[1] || '260');
      document.documentElement.style.setProperty('--accent-s', portfolioData.theme.accentColor.match(/,\s*([^%]+)%,/)?.[1] || '47%');
      document.documentElement.style.setProperty('--accent-l', portfolioData.theme.accentColor.match(/,\s*[^%]+%,\s*([^%]+)%\)/)?.[1] || '63%');
      
      // For ShadCN variables that use HSL values directly:
      // Assuming accentColor is stored as hex. Need conversion logic if HSL.
      // For simplicity, if accent is hex, this part needs a hex-to-HSL conversion
      // Or, store accentColor as HSL string in portfolioData.theme.
      // For now, using the default accent values from globals.css and --custom-accent for specific overrides.
      // The primary ShadCN theme colors (primary, accent) in globals.css are defined with HSL.
      // The color picker should ideally output HSL to directly feed these.
      // If color picker outputs hex, convert it to HSL for --primary, --accent etc.
      // For now, we'll create a `--custom-accent-color` variable and use it.
       document.documentElement.style.setProperty('--custom-accent-color', portfolioData.theme.accentColor);

    }
  }, [portfolioData]);

  return (
    <AppContext.Provider value={{ portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData, currentFont, currentAccentColor }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProviders');
  }
  return context;
};
