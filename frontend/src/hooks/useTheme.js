import { useCallback, useEffect, useState } from 'react';

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// index.html sets data-bs-theme before first paint; this hook keeps it in sync.
const useTheme = () => {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-bs-theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  // Follow OS changes until the user picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!getStoredTheme()) setTheme(getSystemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be unavailable (private mode); the toggle still works.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
