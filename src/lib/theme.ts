export const themeTokens = {
  typography: {
    display: 'clamp(2.25rem, 1.1rem + 4.3vw, 4.75rem)',
    headline: 'clamp(1.75rem, 1.2rem + 2.1vw, 3rem)',
    body: 'clamp(1rem, 0.92rem + 0.35vw, 1.125rem)',
  },
  color: {
    surface: 'var(--surface-1)',
    accent: 'var(--accent-500)',
    success: 'var(--success-500)',
    warning: 'var(--warning-500)',
    neutral: 'var(--neutral-200)',
  },
  elevation: {
    low: 'var(--shadow-soft)',
    medium: 'var(--shadow-elevated)',
    glass: 'var(--glass-intensity)',
    blur: 'var(--blur-glass)',
  },
  spacing: {
    section: 'var(--space-section)',
    container: 'var(--space-container)',
    card: 'var(--space-card)',
  },
  radius: {
    card: 'var(--radius-card)',
    pill: 'var(--radius-pill)',
  },
} as const

export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.75,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
  },
  stagger: {
    tight: 0.08,
    base: 0.12,
  },
} as const
