/* ============================================
   DESIGN SYSTEM CONSTANTS
   JavaScript/React access to design tokens
   ============================================ */

export const COLORS = {
  /* Primary Color System */
  primary: {
    50: '#f0f4f8',
    100: '#e1e9f1',
    200: '#c3d3e3',
    300: '#a5bdd5',
    400: '#87a7c7',
    500: '#6991b9',
    600: '#4d6fa0',
    700: '#3d5681',
    800: '#2d3d62',
    900: '#1d2443',
  },

  /* Secondary Color System */
  secondary: {
    50: '#f5f3f8',
    100: '#ebe7f1',
    200: '#d7cfe3',
    300: '#c3b7d5',
    400: '#af9fc7',
    500: '#9b87b9',
    600: '#8470a0',
    700: '#6d5a87',
    800: '#56436e',
    900: '#3f2c55',
  },

  /* Tertiary Color System */
  tertiary: {
    50: '#f0f8f5',
    100: '#e1f1eb',
    200: '#c3e3d7',
    300: '#a5d5c3',
    400: '#87c7af',
    500: '#69b99b',
    600: '#4da084',
    700: '#3d876d',
    800: '#2d6e56',
    900: '#1d553f',
  },

  /* Semantic Colors */
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  /* Glass Morphism */
  glass: {
    outer: '#EBEFF0',
    inner: '#D2D9DF',
    composite: '#F8FDFF',
  },

  /* Typography */
  text: {
    primary: '#474A4F',
  },
};

export const TYPOGRAPHY = {
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", monospace',
  },

  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const RADIUS = {
  xs: '4px',
  sm: '6px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};

export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
};

export const EASING = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const Z_INDEX = {
  dropdown: 1000,
  tooltip: 1100,
  popover: 1500,
  modal: 2000,
  toast: 3000,
};

export const SHADOWS = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  base: '0 4px 8px rgba(0, 0, 0, 0.1)',
  md: '0 8px 16px rgba(0, 0, 0, 0.12)',
  lg: '0 12px 24px rgba(0, 0, 0, 0.15)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.18)',

  glass: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
    md: '0 6px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },

  inset: {
    light: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
    dark: 'inset 0 -1px 3px rgba(0, 0, 0, 0.08)',
  },
};

export const DESIGN_TOKENS = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  TRANSITIONS,
  EASING,
  Z_INDEX,
  SHADOWS,
};

export default DESIGN_TOKENS;
