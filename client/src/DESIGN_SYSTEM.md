# 🎨 Liquid Glass Design System

This repo uses a centralized token file and minimal component styles.

- `token.css` contains CSS custom properties (design tokens) in `:root`.
- `main.jsx` imports `token.css` first, then `index.css`.
- `App.css` contains component/utility styles built on tokens.

## 🌟 Why this setup?

1. Single source of truth for colors, shadows, radius, etc.
2. Theme safely inherited across components using `var(--token-name)`.
3. `prefers-color-scheme: dark` in `token.css` handles auto dark mode.
4. Easy switch to manual theme class if needed.

## ⚙️ Token usage patterns

### Global variables (`token.css`)
- `--shell`, `--shell-soft`, `--shell-elevated`
- `--glass-surface`, `--glass-surface-strong`, `--glass-inner-plate`
- `--soft-white`, `--medium-white`, `--strong-white`
- `--border-soft`, `--border-standard`, `--border-highlight`
- `--shadow-soft`, `--shadow-deep`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--glass-gradient`, `--inner-depth-gradient`
- `--bg-level-0`, `--bg-level-1`, `--bg-level-2`, `--bg-level-glass`

### In components (`App.css`, other modules)

```css
.card {
  background: var(--glass-surface);
  border: 1px solid var(--border-standard);
  box-shadow: var(--shadow-soft);
  border-radius: var(--border-radius);
  backdrop-filter: var(--glass-blur);
  color: var(--text-primary);
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

- Default tokens set to light
- Dark mode overrides in `@media (prefers-color-scheme: dark)`
- Optionally add manual override class in future:

```css
.theme-dark {
  --shell: #080A0F;
  --text-primary: #F1F5FB;
  /* ... */
}
```

## 🛠️ How to add a new token

1. Add variable in `token.css` under `:root` (and dark override if needed)
2. Reference variable in components: `var(--new-token)`
3. Update docs here with token name and use case

## 🧩 Quick reference

- Panels: `--glass-surface` + `--glass-gradient` + `--shadow-soft`
- Text: `--text-primary` / `--text-secondary` / `--text-muted`
- Background: `--bg-level-0` / `--bg-level-1` / `--bg-level-2`
- Borders: `--border-...`
- Shape: `--border-radius`
- Motion: `--transition-base`

---

## 🧑‍💻 Quick dev tip

Use tokens in JavaScript styles too:

```js
const buttonStyle = {
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--glass-surface'),
};
```
