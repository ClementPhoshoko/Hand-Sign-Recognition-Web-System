import { useState, useEffect } from 'react';

/**
 * useTheme Hook
 * Manages light/dark mode themes with system preference detection
 * 
 * Returns: { theme, toggleTheme, setTheme }
 *  - theme: 'light' | 'dark' | 'system'
 *  - toggleTheme: () => void (cycles through themes)
 *  - setTheme: (theme) => void (sets specific theme)
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState('system');
  const [isClient, setIsClient] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setIsClient(true);
    // Get stored theme preference
    const storedTheme = localStorage.getItem('theme') || 'system';
    setThemeState(storedTheme);
    applyTheme(storedTheme);
  }, []);

  // Apply theme to DOM
  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'system') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      root.style.colorScheme = 'light dark';
    } else {
      // Use explicit theme
      root.setAttribute('data-theme', selectedTheme);
      root.style.colorScheme = selectedTheme;
    }
  };

  // Set specific theme
  const setTheme = (selectedTheme) => {
    if (['light', 'dark', 'system'].includes(selectedTheme)) {
      setThemeState(selectedTheme);
      localStorage.setItem('theme', selectedTheme);
      applyTheme(selectedTheme);
    }
  };

  // Toggle between light and dark (skip system)
  const toggleTheme = () => {
    const themeCycle = { light: 'dark', dark: 'light', system: 'light' };
    const newTheme = themeCycle[theme] || 'light';
    setTheme(newTheme);
  };

  if (!isClient) {
    return { theme: 'system', toggleTheme: () => {}, setTheme: () => {} };
  }

  return { theme, toggleTheme, setTheme };
};
