# 🎨 Glassmorphism Design System

A comprehensive design system built with CSS custom properties for the Hand Sign Recognition Web System. Supports light/dark modes with automatic system preference detection.

---

## 📋 Overview

All CSS variables are defined in `App.css` and applied globally via `index.css`. The system is organized into logical groups:

- **Color Palettes** (Primary, Secondary, Tertiary)
- **Background Layers** (0-3 depth levels)
- **Text Colors** (Primary, Secondary, Tertiary, Disabled, Inverse)
- **Glass Morphism Effects** (Blur, Backdrop, Transparency)
- **Borders & Strokes** (Inner, Outer, Highlight)
- **Shadows** (Depth cues for layering)
- **Typography** (Fonts, sizes, weights, line heights)
- **Spacing & Radius** (Layout scale)
- **Transitions** (Animation timing)
- **Z-Index Scale** (Layering hierarchy)

---

## 🎯 Quick Start

### Using Color Variables

```css
/* Background */
background-color: var(--bg-level-1);

/* Text */
color: var(--text-primary);

/* Borders */
border: 1px solid var(--border-medium);

/* Shadows */
box-shadow: var(--shadow-md);
```

### Creating Glass Elements

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glass-md);
  
  /* Optional: Add highlight effect */
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--highlight-white);
}
```

---

## 🎨 Color System

### Primary Colors (Main Branding)
```
--primary-50  through --primary-900
Used for buttons, links, primary actions
```

### Secondary Colors (Supporting)
```
--secondary-50 through --secondary-900
Used for accents, secondary elements
```

### Tertiary Colors (UI States)
```
--tertiary-50 through --tertiary-900
Used for alerts, feedback, misc UI
```

### Semantic Colors
```
--color-success: #10b981   (Green)
--color-warning: #f59e0b   (Amber)
--color-error: #ef4444     (Red)
--color-info: #3b82f6      (Blue)
```

---

## 🌓 Light & Dark Mode

### Automatic System Detection
By default, the app respects the user's system preference:
```javascript
// Automatic - no action needed
// App respects: @media (prefers-color-scheme: dark)
```

### Manual Theme Control
Use the `useTheme` hook in React components:

```javascript
import { useTheme } from '@/hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
```

### Explicit Theme Setting
Add `data-theme` attribute to HTML:
```html
<!-- Light theme -->
<html data-theme="light">

<!-- Dark theme -->
<html data-theme="dark">

<!-- System preference (default) -->
<html data-theme="system">
```

---

## ✨ Glassmorphism Features

### Glass Backgrounds
```css
--glass-bg: rgba(248, 253, 255, 0.7);      /* Standard */
--glass-bg-strong: rgba(248, 253, 255, 0.85);/* Opaque */
--glass-bg-subtle: rgba(248, 253, 255, 0.5); /* Transparent */
```

### Glass Blur Effects
```css
--glass-blur: blur(12px);        /* Standard blur */
--glass-blur-weak: blur(6px);    /* Subtle blur */
--glass-blur-strong: blur(20px); /* Strong blur */

/* Apply with backdrop-filter */
backdrop-filter: var(--glass-backdrop);
```

### Highlight Bands (Top Edge Shine)
```css
background: var(--band-top);         /* Full shine */
background: var(--band-top-subtle);  /* Subtle shine */
```

### Inner Strokes (Glass Depth)
```css
border: 1px solid var(--inner-stroke-light);   /* Bright edge */
border-bottom: 1px solid var(--inner-stroke-dark); /* Dark edge */
```

---

## 🎯 Shadow System

### Regular Shadows (Direct light from above)
```css
--shadow-xs   /* 0 1px 2px */
--shadow-sm   /* 0 2px 4px */
--shadow-base /* 0 4px 8px */
--shadow-md   /* 0 8px 16px */
--shadow-lg   /* 0 12px 24px */
--shadow-xl   /* 0 16px 32px */
```

### Glass Shadows (Softer for frosted effect)
```css
--shadow-glass-sm  /* Subtle shadow */
--shadow-glass-md  /* Medium shadow */
--shadow-glass-lg  /* Strong shadow */
```

### Inset Shadows (Internal depth)
```css
--shadow-inset-light /* White inner glow */
--shadow-inset-dark  /* Dark inner shadow */
```

---

## 📐 Typography

### Font Families
```css
--font-sans: System fonts (UI text)
--font-mono: Monospace fonts (Code)
```

### Font Sizes
```css
--text-xs   /* 0.75rem (12px) */
--text-sm   /* 0.875rem (14px) */
--text-base /* 1rem (16px) */
--text-lg   /* 1.125rem (18px) */
--text-xl   /* 1.25rem (20px) */
--text-2xl  /* 1.5rem (24px) */
--text-3xl  /* 1.875rem (30px) */
--text-4xl  /* 2.25rem (36px) */
```

### Font Weights
```css
--font-light:     300
--font-normal:    400
--font-medium:    500
--font-semibold:  600
--font-bold:      700
```

### Line Heights
```css
--line-tight:   1.2
--line-snug:    1.375
--line-normal:  1.5
--line-relaxed: 1.625
--line-loose:   2
```

---

## 📏 Spacing Scale

```css
--space-0   /* 0 */
--space-1   /* 0.25rem (4px) */
--space-2   /* 0.5rem (8px) */
--space-3   /* 0.75rem (12px) */
--space-4   /* 1rem (16px) */
--space-5   /* 1.25rem (20px) */
--space-6   /* 1.5rem (24px) */
--space-8   /* 2rem (32px) */
--space-10  /* 2.5rem (40px) */
--space-12  /* 3rem (48px) */
--space-16  /* 4rem (64px) */
--space-20  /* 5rem (80px) */
```

---

## 🔲 Border Radius

```css
--radius-xs:   4px    /* Very small */
--radius-sm:   6px    /* Small */
--radius-base: 8px    /* Default */
--radius-md:   12px   /* Medium */
--radius-lg:   16px   /* Large */
--radius-xl:   20px   /* Extra large */
--radius-full: 9999px /* Pill/circle */
```

---

## ⏱️ Transitions

### Timing
```css
--transition-fast:  150ms ease-in-out
--transition-base:  250ms ease-in-out
--transition-slow:  350ms ease-in-out
```

### Easing Functions
```css
--easing-ease-in:     cubic-bezier(0.4, 0, 1, 1)
--easing-ease-out:    cubic-bezier(0, 0, 0.2, 1)
--easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

**Usage:**
```css
.element {
  transition: all var(--transition-base);
  transition-timing-function: var(--easing-ease-in-out);
}
```

---

## 🎯 Z-Index Scale

```css
--z-dropdown: 1000   /* Dropdowns */
--z-tooltip:  1100   /* Tooltips */
--z-popover:  1500   /* Popovers */
--z-modal:    2000   /* Modals/Dialogs */
--z-toast:    3000   /* Toast notifications */
```

---

## 🎨 Best Practices

### 1. Use Semantic Variables
```css
/* ✅ Good */
background-color: var(--bg-level-1);
color: var(--text-primary);

/* ❌ Avoid */
background-color: #ebeff0;
color: #474a4f;
```

### 2. Maintain Hierarchy
```css
.card {
  background: var(--bg-level-1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.card-highlighted {
  background: var(--bg-level-2);
  box-shadow: var(--shadow-lg);
}
```

### 3. Glass Elements Pattern
```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glass-md);
  
  /* Add top highlight for depth */
  position: relative;
  overflow: hidden;
}

.glass-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--highlight-white);
}
```

### 4. Contrast & Accessibility
```css
/* Always ensure 4.5:1 contrast ratio for text */
.text-on-light {
  color: var(--text-primary);        /* #474A4F on light bg */
}

.text-on-dark {
  color: var(--text-inverse);        /* White on dark bg */
}
```

### 5. Responsive Transitions
```css
/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 📝 Component Examples

### Basic Card
```jsx
export function Card({ children }) {
  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-backdrop)',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-glass-md)',
      padding: 'var(--space-6)',
    }}>
      {children}
    </div>
  );
}
```

### Button
```jsx
export function Button({ children }) {
  return (
    <button style={{
      background: 'var(--primary-600)',
      color: 'white',
      padding: 'var(--space-3) var(--space-6)',
      borderRadius: 'var(--radius-base)',
      border: 'none',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--font-semibold)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
    }}>
      {children}
    </button>
  );
}
```

### Input
```jsx
export function Input() {
  return (
    <input style={{
      background: 'var(--bg-level-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-base)',
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--text-base)',
    }} />
  );
}
```

---

## 🚀 Migration Guide

If updating existing components:

1. Replace hardcoded colors with `var(--bg-levelX)` or `var(--text-primary)`
2. Use spacing variables: `padding: var(--space-4)`
3. Apply shadows: `box-shadow: var(--shadow-base)`
4. Use transitions: `transition: all var(--transition-base)`
5. Test in both light and dark modes

---

## 📚 Resources

- CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- Glassmorphism Design: https://www.uxdesigninstitute.com/blog/glassmorphism/
- Color Contrast (WCAG): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- Dark Mode: https://web.dev/prefers-color-scheme/

