# 🎨 Liquid Glass Design System

Premium glassmorphism theme with enhanced glow effects and luminous border effects.

- `token.css` contains CSS custom properties (design tokens) in `:root`.
- `main.jsx` imports `token.css` first, then `index.css`.
- `App.css` contains component/utility styles built on tokens.

## 🌟 Why this setup?

1. **Single source of truth** for colors, shadows, glows, typography, spacing.
2. **Theme safely inherited** across components using `var(--token-name)`.
3. **Prefers-color-scheme** in `token.css` handles auto dark mode.
4. **Premium glow effects** with dedicated `--glow-outer` and `--glow-inner` tokens.
5. **Easy scaling** — all components get theme updates automatically.

## ⚙️ Token usage patterns

### Global variables (`token.css`)

**Colors & Glass:**
- `--shell`, `--shell-soft`, `--shell-elevated` (base backgrounds)
- `--glass-surface`, `--glass-surface-strong`, `--glass-inner-plate` (frosted layers)
- `--soft-white`, `--medium-white`, `--strong-white` (liquid light layers)
- `--border-soft`, `--border-standard`, `--border-highlight` (edge definition)

**Glow & Fx:**
- `--top-highlight` (top edge shine)
- `--edge-glow` (subtle glow on edges)
- `--glow-outer` (outer luminous glow shadow)
- `--glow-inner` (inset highlight for depth)

**Shadows:**
- `--shadow-soft` (subtle depth)
- `--shadow-deep` (strong layering)
- `--shadow-glow` (atmospheric glow shadow)

**Text:**
- `--text-primary` (main text)
- `--text-secondary` (supporting text)
- `--text-muted` (faded/disabled text)

**Gradients:**
- `--glass-gradient` (direction + opacity blend)
- `--inner-depth-gradient` (3D depth effect)

### In components (`.glass-panel` example)

```css
.glass-panel {
  position: relative;
  background: var(--glass-inner-plate);
  border: 1.5px solid var(--border-highlight);
  backdrop-filter: var(--glass-blur);
  box-shadow: 
    var(--glow-outer),
    var(--glow-inner),
    var(--shadow-deep);
  background-image: var(--glass-gradient);
  color: var(--text-primary);
}

.glass-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--top-highlight), transparent);
}
```

### Base page style (`index.css`)

```css
html, body {
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-level-0);
  color: var(--text-primary);
}
```

## 🌓 Light / Dark themes

- Default tokens set for **light mode** (bright glows)
- Dark mode overrides in `@media (prefers-color-scheme: dark)` (toned-down glows)
- All glow, shadow, text, border tokens adjust automatically

### Manual theme override (future)

```css
[data-theme="dark"] {
  --shell: #080A0F;
  --glow-outer: 0 0 50px rgba(255, 255, 255, 0.06);
  /* ... */
}
```

## 🛠️ How to add a new token

1. Add variable in `token.css` under `:root`
2. Add dark mode override if different
3. Reference in components: `var(--new-token)`
4. Update docs here with name and purpose

## 🧩 Quick reference

- **Panels:** `--glass-surface` + `--glass-gradient` + `--glow-outer`
- **Text:** `--text-primary` / `--text-secondary` / `--text-muted`
- **Background:** `--bg-level-0` / `--bg-level-1` / `--bg-level-2`
- **Glow:** `--glow-outer`, `--glow-inner`, `--top-highlight`
- **Shape:** `--border-radius`, `--radius-base`, `--radius-full`
- **Motion:** `--transition-fast`, `--transition-base`, `--transition-slow`
- **Typography:** `--font-semibold`, `--text-lg`, `--line-relaxed`

## 🎨 Premium effects

The system now supports:
- Outer glow effects (luminous borders)
- Inner inset highlights (depth perception)
- Soft blur + backdrop filters
- Top edge shine gradients
- Atmospheric shadows

## 🧑‍💻 Usage in components

```jsx
import './Card.css'

export default function Card({ title, description, actions }) {
  return (
    <article className="glass-panel">
      <h3>{title}</h3>
      <p>{description}</p>
      {actions && <div className="card-actions">{...}</div>}
    </article>
  )
}
```

Apply `glass-panel` class for instant glow + blur effect.

---

**Version:** 1.1 (Enhanced glow system)  
**Last updated:** 2026-04-02
