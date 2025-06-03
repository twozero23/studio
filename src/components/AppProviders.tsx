
"use client";

import React, { createContext, useContext, useEffect, ReactNode, useCallback } from 'react';
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
  themeMode: 'light' | 'dark';
  toggleThemeMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const { portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData } = usePortfolioData();

  const currentFont = portfolioData?.theme?.font || DEFAULT_FONT;
  const currentAccentColor = portfolioData?.theme?.accentColor || DEFAULT_ACCENT_COLOR;
  const themeMode = portfolioData?.theme?.mode || 'light';

  const toggleThemeMode = useCallback(() => {
    updateTheme(prevTheme => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light',
    }));
  }, [updateTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (themeMode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [themeMode]);

  useEffect(() => {
    if (portfolioData) {
      // Apply font
      const fontPreference = AVAILABLE_FONTS.find(f => f.name === portfolioData.theme.font)?.value || AVAILABLE_FONTS.find(f => f.name === DEFAULT_FONT)?.value;
      document.body.style.fontFamily = fontPreference as string;

      // Apply custom accent color
      document.documentElement.style.setProperty('--custom-accent-color', portfolioData.theme.accentColor);

      const h = portfolioData.theme.accentColor.match(/hsl\(([^,]+),/)?.[1] || '170';
      const s = portfolioData.theme.accentColor.match(/,\s*([^%]+)%,/)?.[1] || '60'; 
      const l = portfolioData.theme.accentColor.match(/,\s*[^%]+%,\s*([^%]+)%\)/)?.[1] || '45'; 

      document.documentElement.style.setProperty('--accent-h', h);
      document.documentElement.style.setProperty('--accent-s', `${s}%`);
      document.documentElement.style.setProperty('--accent-l', `${l}%`);
    }
  }, [portfolioData]);

  return (
    <AppContext.Provider value={{ portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData, currentFont, currentAccentColor, themeMode, toggleThemeMode }}>
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
