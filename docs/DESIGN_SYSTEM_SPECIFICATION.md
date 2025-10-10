# BeeSure Design System Specification

## 🎨 Brand Identity

### Brand Concept
BeeSure represents trust, authenticity, and natural purity in the honey marketplace. The design should evoke:
- **Natural warmth** through honey-inspired colors
- **Trust and security** through blockchain verification
- **Premium quality** through elegant typography and spacing
- **Sustainability** through earth-tone accents

## 🌈 Color Palette

### Primary Colors
```css
/* Primary Honey Gold */
--primary: #F59E0B;
--primary-foreground: #FFFFFF;
--primary-50: #FFFBEB;
--primary-100: #FEF3C7;
--primary-200: #FDE68A;
--primary-300: #FCD34D;
--primary-400: #FBBF24;
--primary-500: #F59E0B; /* Main */
--primary-600: #D97706;
--primary-700: #B45309;
--primary-800: #92400E;
--primary-900: #78350F;

/* Secondary Amber */
--secondary: #D97706;
--secondary-foreground: #FFFFFF;
--secondary-50: #FFFBEB;
--secondary-100: #FEF3C7;
--secondary-200: #FDE68A;
--secondary-300: #FCD34D;
--secondary-400: #FBBF24;
--secondary-500: #F59E0B;
--secondary-600: #D97706; /* Main */
--secondary-700: #B45309;
--secondary-800: #92400E;
--secondary-900: #78350F;

/* Accent Forest Green */
--accent: #059669;
--accent-foreground: #FFFFFF;
--accent-50: #ECFDF5;
--accent-100: #D1FAE5;
--accent-200: #A7F3D0;
--accent-300: #6EE7B7;
--accent-400: #34D399;
--accent-500: #10B981;
--accent-600: #059669; /* Main */
--accent-700: #047857;
--accent-800: #065F46;
--accent-900: #064E3B;
```

### Neutral Colors
```css
/* Background & Surface */
--background: #FEFEFE;
--foreground: #1F2937;
--card: #FFFFFF;
--card-foreground: #1F2937;
--popover: #FFFFFF;
--popover-foreground: #1F2937;

/* Borders & Separators */
--border: #E5E7EB;
--input: #E5E7EB;
--ring: #F59E0B;

/* Text Colors */
--muted: #F9FAFB;
--muted-foreground: #6B7280;
--destructive: #EF4444;
--destructive-foreground: #FFFFFF;
```

### Semantic Colors
```css
/* Success (Organic/Verified) */
--success: #10B981;
--success-light: #D1FAE5;

/* Warning (Stock Alert) */
--warning: #F59E0B;
--warning-light: #FEF3C7;

/* Error (Out of Stock) */
--error: #EF4444;
--error-light: #FEE2E2;

/* Info (NFT/Blockchain) */
--info: #3B82F6;
--info-light: #DBEAFE;
```

## 📝 Typography

### Font Families
```css
/* Headings - Serif for elegance */
--font-serif: 'Playfair Display', 'Georgia', serif;

/* Body Text - Sans-serif for readability */
--font-sans: 'Inter', 'Helvetica Neue', sans-serif;

/* Code/Technical - Monospace */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Typography Scale
```css
/* Display Headings */
--text-6xl: 3.75rem; /* 60px - Hero titles */
--text-5xl: 3rem;    /* 48px - Page titles */
--text-4xl: 2.25rem; /* 36px - Section titles */

/* Content Headings */
--text-3xl: 1.875rem; /* 30px - Card titles */
--text-2xl: 1.5rem;   /* 24px - Subsection titles */
--text-xl: 1.25rem;   /* 20px - Component titles */
--text-lg: 1.125rem;  /* 18px - Large body text */

/* Body Text */
--text-base: 1rem;     /* 16px - Default body */
--text-sm: 0.875rem;   /* 14px - Small text */
--text-xs: 0.75rem;    /* 12px - Captions */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Subheadings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.625; /* Large body text */
```

## 📏 Spacing System

### Base Unit: 4px (0.25rem)

```css
/* Spacing Scale */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

### Layout Spacing
```css
/* Container Padding */
--container-padding: 1rem; /* Mobile */
--container-padding-lg: 2rem; /* Desktop */

/* Section Spacing */
--section-spacing: 4rem; /* Between major sections */
--component-spacing: 2rem; /* Between components */
--element-spacing: 1rem; /* Between elements */
```

## 🔲 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius: 0.375rem;      /* 6px - Default */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Circular */
```

## 🌟 Shadows

```css
/* Elevation System */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Colored Shadows for Emphasis */
--shadow-primary: 0 4px 14px 0 rgb(245 158 11 / 0.25);
--shadow-success: 0 4px 14px 0 rgb(16 185 129 / 0.25);
--shadow-error: 0 4px 14px 0 rgb(239 68 68 / 0.25);
```

## 📱 Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

## 🎯 Component Specifications

### Buttons

#### Primary Button
- **Background**: var(--primary)
- **Text**: var(--primary-foreground)
- **Padding**: 12px 24px
- **Border Radius**: var(--radius)
- **Font Weight**: var(--font-medium)
- **Shadow**: var(--shadow-sm)
- **Hover**: Darken background by 10%
- **Active**: Scale 0.98

#### Secondary Button
- **Background**: transparent
- **Border**: 1px solid var(--border)
- **Text**: var(--foreground)
- **Padding**: 12px 24px
- **Border Radius**: var(--radius)
- **Hover**: Background var(--muted)

#### Button Sizes
- **Small**: 8px 16px, text-sm
- **Default**: 12px 24px, text-base
- **Large**: 16px 32px, text-lg

### Cards

#### Product Card
- **Background**: var(--card)
- **Border**: 1px solid var(--border)
- **Border Radius**: var(--radius-lg)
- **Padding**: 24px
- **Shadow**: var(--shadow)
- **Hover**: var(--shadow-lg)

#### Stats Card
- **Background**: var(--card)
- **Border**: 1px solid var(--border)
- **Border Radius**: var(--radius)
- **Padding**: 20px
- **Shadow**: var(--shadow-sm)

### Forms

#### Input Fields
- **Background**: var(--background)
- **Border**: 1px solid var(--input)
- **Border Radius**: var(--radius)
- **Padding**: 12px 16px
- **Font Size**: var(--text-base)
- **Focus**: Border var(--ring), shadow var(--shadow-primary)

#### Labels
- **Font Weight**: var(--font-medium)
- **Font Size**: var(--text-sm)
- **Color**: var(--foreground)
- **Margin Bottom**: var(--space-2)

### Navigation

#### Header
- **Height**: 64px
- **Background**: var(--background)
- **Border Bottom**: 1px solid var(--border)
- **Padding**: 0 var(--container-padding)
- **Shadow**: var(--shadow-sm)

#### Navigation Links
- **Font Weight**: var(--font-medium)
- **Font Size**: var(--text-sm)
- **Color**: var(--muted-foreground)
- **Hover**: var(--foreground)
- **Active**: var(--primary)

## 🏗️ Layout Grid

### Container
- **Max Width**: 1280px
- **Margin**: 0 auto
- **Padding**: var(--container-padding)

### Grid System
- **Columns**: 12-column grid
- **Gap**: 24px (desktop), 16px (mobile)
- **Breakpoints**: Follow CSS breakpoint system

## 🎨 Design Tokens Summary

```json
{
  "colors": {
    "primary": "#F59E0B",
    "secondary": "#D97706",
    "accent": "#059669",
    "background": "#FEFEFE",
    "foreground": "#1F2937"
  },
  "typography": {
    "fontFamily": {
      "serif": "Playfair Display",
      "sans": "Inter"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  "borderRadius": {
    "sm": "0.125rem",
    "default": "0.375rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "full": "9999px"
  }
}
```

This design system specification provides the foundation for creating consistent, beautiful designs across the BeeSure honey marketplace platform.
