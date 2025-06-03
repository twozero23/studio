
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
        const parsedData = JSON.parse(storedData) as PortfolioData;
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

        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCalculatedState));
        } catch (error) {
          console.error("Failed to save portfolio data to localStorage:", error);
        }
        return newCalculatedState;
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
