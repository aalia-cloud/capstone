// Design System Configuration for BeeSure Honey Marketplace

export const colors = {
  // Primary brand colors inspired by BeeSure
  primary: {
    50: '#fef7e6',
    100: '#fdecc0',
    200: '#fbd896',
    300: '#f9c46c',
    400: '#f7b042',
    500: '#f59e0b', // Main honey gold
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Secondary colors for accents
  secondary: {
    50: '#f8f4f0',
    100: '#e8ddd4',
    200: '#d4c4b0',
    300: '#c0a88c',
    400: '#ac8d68',
    500: '#8b5a2b', // Warm brown
    600: '#7c4a1f',
    700: '#6d3a13',
    800: '#5e2a07',
    900: '#4f1a00',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Background colors
  background: {
    primary: '#fefcf7', // Warm cream
    secondary: '#f8f4f0',
    dark: '#1c1917',
  }
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Playfair Display', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  }
};

export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

// Component variants
export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      color: 'white',
      padding: `${spacing.sm} ${spacing.lg}`,
      borderRadius: borderRadius.lg,
      fontWeight: typography.fontWeight.medium,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: colors.primary[600],
        transform: 'translateY(-1px)',
        boxShadow: shadows.md,
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `2px solid ${colors.primary[500]}`,
      padding: `${spacing.sm} ${spacing.lg}`,
      borderRadius: borderRadius.lg,
      fontWeight: typography.fontWeight.medium,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: colors.primary[50],
        transform: 'translateY(-1px)',
      }
    }
  },
  
  card: {
    default: {
      backgroundColor: 'white',
      borderRadius: borderRadius.xl,
      boxShadow: shadows.md,
      padding: spacing.lg,
      border: `1px solid ${colors.neutral[200]}`,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: shadows.lg,
        transform: 'translateY(-2px)',
      }
    }
  }
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components
};

