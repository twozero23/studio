
"use client";
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/components/AppProviders';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { themeMode, toggleThemeMode } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    // For a button, a disabled placeholder might be appropriate
    return <Button variant="ghost" size="icon" disabled aria-label="Toggle theme" className="h-[1.8rem] w-[1.8rem]" />;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleThemeMode} aria-label="Toggle theme" className="h-[1.8rem] w-[1.8rem]">
      {themeMode === 'dark' ? 
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" /> : 
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />}
    </Button>
  );
};
