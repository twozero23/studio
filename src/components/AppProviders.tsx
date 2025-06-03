
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

      // Apply custom accent color
      document.documentElement.style.setProperty('--custom-accent-color', portfolioData.theme.accentColor);

      // Attempt to parse HSL from the accentColor to update the theme's generic --accent variable
      // Fallback to the default --accent HSL values from globals.css (Sunny Coral & Teal theme) if parsing fails.
      // Default Teal: hsl(170, 60%, 45%)
      const h = portfolioData.theme.accentColor.match(/hsl\(([^,]+),/)?.[1] || '170';
      const s = portfolioData.theme.accentColor.match(/,\s*([^%]+)%,/)?.[1] || '60'; // just the number
      const l = portfolioData.theme.accentColor.match(/,\s*[^%]+%,\s*([^%]+)%\)/)?.[1] || '45'; // just the number

      document.documentElement.style.setProperty('--accent-h', h);
      document.documentElement.style.setProperty('--accent-s', `${s}%`);
      document.documentElement.style.setProperty('--accent-l', `${l}%`);

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
