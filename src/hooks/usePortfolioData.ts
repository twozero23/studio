
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData, PortfolioTheme, FontOption } from '@/lib/portfolio-data-types';
import { defaultPortfolioData } from '@/lib/default-portfolio-data';

const LOCAL_STORAGE_KEY = 'portfolioData';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as PortfolioData;
        // Ensure theme object and its properties exist
        const validatedTheme: PortfolioTheme = {
          accentColor: parsedData.theme?.accentColor || defaultPortfolioData.theme.accentColor,
          font: parsedData.theme?.font || defaultPortfolioData.theme.font,
          mode: parsedData.theme?.mode || defaultPortfolioData.theme.mode,
          profilePictureUrl: parsedData.theme?.profilePictureUrl || defaultPortfolioData.theme.profilePictureUrl,
        };
        setPortfolioData({ ...defaultPortfolioData, ...parsedData, theme: validatedTheme });
      } else {
        setPortfolioData(defaultPortfolioData);
      }
    } catch (error) {
      console.error("Failed to load portfolio data from localStorage:", error);
      setPortfolioData(defaultPortfolioData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePortfolioData = useCallback((newData: Partial<PortfolioData> | ((prevData: PortfolioData) => PortfolioData)) => {
    setPortfolioData(prevData => {
      if (!prevData) return null; // Should not happen if isLoading is handled
      const updatedData = typeof newData === 'function' ? newData(prevData) : { ...prevData, ...newData };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      } catch (error) {
        console.error("Failed to save portfolio data to localStorage:", error);
      }
      return updatedData;
    });
  }, []);
  
  const updateTheme = useCallback((newTheme: Partial<PortfolioTheme> | ((prevTheme: PortfolioTheme) => PortfolioTheme)) => {
    setPortfolioData(prevData => {
      if (!prevData) return null;
      const currentTheme = prevData.theme || defaultPortfolioData.theme;
      const updatedThemeObject = typeof newTheme === 'function' ? newTheme(currentTheme) : { ...currentTheme, ...newTheme };
      
      const updatedData = { ...prevData, theme: updatedThemeObject };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      } catch (error) {
        console.error("Failed to save theme data to localStorage:", error);
      }
      return updatedData;
    });
  }, []);

  const resetPortfolioData = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setPortfolioData(defaultPortfolioData);
  }, []);

  return { portfolioData, isLoading, updatePortfolioData, updateTheme, resetPortfolioData };
};
