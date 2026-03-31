/**
 * Design System Examples
 * 
 * This file demonstrates how to use the glassmorphism design system
 * in React components with both CSS and inline styles.
 */

import { useTheme } from '@/hooks';
import { COLORS, SPACING, RADIUS, SHADOWS, TRANSITIONS } from '@/constants';
import './DesignSystemExamples.css';

/**
 * Example 1: Theme Switcher
 * Shows how to handle theme switching
 */
export function ThemeSwitcher() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

/**
 * Example 2: Glass Card
 * Demonstrates glassmorphism styling
 */
export function GlassCard({ title, children }) {
  return (
    <div className="glass-card">
      <div className="glass-card-highlight" />
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

/**
 * Example 3: Reusable Button with variants
 */
export function Button({ variant = 'primary', size = 'md', children, ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return (
    <button
      className={`btn ${variants[variant]} ${sizes[size]}`}
      style={{
        background: variant === 'primary' ? 'var(--primary-600)' : undefined,
        color: variant === 'primary' ? 'white' : undefined,
        padding:
          size === 'sm'
            ? `${SPACING[2]} ${SPACING[3]}`
            : size === 'lg'
              ? `${SPACING[4]} ${SPACING[8]}`
              : `${SPACING[3]} ${SPACING[6]}`,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Example 4: Status Badge
 * Uses semantic colors for status indication
 */
export function StatusBadge({ status = 'success' }) {
  const statusConfig = {
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      text: '#059669',
      label: '✓ Success',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      text: '#d97706',
      label: '⚠ Warning',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      text: '#dc2626',
      label: '✕ Error',
    },
    info: {
      bg: 'rgba(59, 130, 246, 0.1)',
      text: '#2563eb',
      label: 'ℹ Info',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: SPACING[2],
        background: config.bg,
        color: config.text,
        padding: `${SPACING[2]} ${SPACING[3]}`,
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-sm)',
        fontWeight: '500',
      }}
    >
      {config.label}
    </span>
  );
}

/**
 * Example 5: Input with Placeholder
 */
export function Input({ placeholder = 'Enter text...', ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="glass-input"
      style={{
        width: '100%',
        background: 'var(--bg-level-2)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-base)',
        padding: `${SPACING[3]} ${SPACING[4]}`,
        fontSize: 'var(--text-base)',
        transition: `all ${TRANSITIONS.fast}`,
      }}
      {...props}
    />
  );
}

/**
 * Example 6: Gesture Result Display
 * Shows how to combine multiple design elements
 */
export function GestureResult({ emoji, label, confidence }) {
  return (
    <div
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-backdrop)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: SPACING[8],
        textAlign: 'center',
        boxShadow: 'var(--shadow-glass-lg)',
      }}
    >
      <div
        style={{
          fontSize: '3rem',
          marginBottom: SPACING[4],
        }}
      >
        {emoji}
      </div>

      <h2 style={{ color: 'var(--text-primary)', marginBottom: SPACING[2] }}>
        {label}
      </h2>

      {confidence && (
        <div
          style={{
            marginTop: SPACING[4],
          }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: SPACING[2] }}>
            Confidence
          </p>
          <div
            style={{
              background: 'var(--bg-level-2)',
              borderRadius: 'var(--radius-full)',
              height: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'var(--primary-600)',
                height: '100%',
                width: `${confidence}%`,
                transition: `width ${TRANSITIONS.base}`,
              }}
            />
          </div>
          <p
            style={{
              color: 'var(--text-tertiary)',
              marginTop: SPACING[2],
              fontSize: 'var(--text-sm)',
            }}
          >
            {confidence}%
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 7: Design System Showcase
 * Component to display all design tokens
 */
export function DesignSystemShowcase() {
  return (
    <div style={{ padding: SPACING[8] }}>
      <h1>Design System Showcase</h1>

      <section style={{ marginTop: SPACING[8] }}>
        <h2>Glass Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: SPACING[6], marginTop: SPACING[4] }}>
          <GlassCard title="Card 1">
            <p>Glass morphism effect example</p>
          </GlassCard>
          <GlassCard title="Card 2">
            <p>Frosted glass with blur</p>
          </GlassCard>
          <GlassCard title="Card 3">
            <p>Highlight band on top</p>
          </GlassCard>
        </div>
      </section>

      <section style={{ marginTop: SPACING[8] }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: SPACING[4], flexWrap: 'wrap', marginTop: SPACING[4] }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div
          style={{
            display: 'flex',
            gap: SPACING[4],
            flexWrap: 'wrap',
            marginTop: SPACING[4],
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: SPACING[8] }}>
        <h2>Status Badges</h2>
        <div
          style={{
            display: 'flex',
            gap: SPACING[4],
            flexWrap: 'wrap',
            marginTop: SPACING[4],
          }}
        >
          <StatusBadge status="success" />
          <StatusBadge status="warning" />
          <StatusBadge status="error" />
          <StatusBadge status="info" />
        </div>
      </section>

      <section style={{ marginTop: SPACING[8] }}>
        <h2>Shadow Scale</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: SPACING[4],
            marginTop: SPACING[4],
          }}
        >
          {Object.entries(SHADOWS).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: 'var(--bg-level-1)',
                padding: SPACING[4],
                borderRadius: 'var(--radius-base)',
                boxShadow: typeof value === 'string' ? value : undefined,
                textAlign: 'center',
              }}
            >
              <small>{key}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
