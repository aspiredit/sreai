/**
 * unQuery Design System
 * Comprehensive design tokens and utilities for consistent styling
 */

// Color System
export const colors = {
  // Primary Brand Colors
  primary: {
    50: 'hsl(221, 83%, 95%)',
    100: 'hsl(221, 83%, 90%)',
    200: 'hsl(221, 83%, 80%)',
    300: 'hsl(221, 83%, 70%)',
    400: 'hsl(221, 83%, 60%)',
    500: 'hsl(221, 83%, 53%)', // Main brand color
    600: 'hsl(221, 83%, 45%)',
    700: 'hsl(221, 83%, 35%)',
    800: 'hsl(221, 83%, 25%)',
    900: 'hsl(221, 83%, 15%)',
  },
  
  // Semantic Colors
  semantic: {
    success: {
      light: 'hsl(142, 76%, 45%)',
      main: 'hsl(142, 76%, 36%)',
      dark: 'hsl(142, 76%, 25%)',
    },
    warning: {
      light: 'hsl(38, 92%, 60%)',
      main: 'hsl(38, 92%, 50%)',
      dark: 'hsl(38, 92%, 40%)',
    },
    error: {
      light: 'hsl(0, 84%, 65%)',
      main: 'hsl(0, 84%, 60%)',
      dark: 'hsl(0, 84%, 50%)',
    },
    info: {
      light: 'hsl(199, 89%, 55%)',
      main: 'hsl(199, 89%, 48%)',
      dark: 'hsl(199, 89%, 40%)',
    },
  },
  
  // Feature Colors (for icons and highlights)
  feature: {
    blue: 'hsl(199, 89%, 48%)',
    green: 'hsl(142, 76%, 36%)',
    purple: 'hsl(262, 83%, 58%)',
    orange: 'hsl(25, 95%, 53%)',
    pink: 'hsl(330, 81%, 60%)',
    yellow: 'hsl(45, 93%, 47%)',
    red: 'hsl(0, 84%, 60%)',
    emerald: 'hsl(160, 84%, 39%)',
    cyan: 'hsl(188, 94%, 43%)',
    violet: 'hsl(262, 83%, 58%)',
    amber: 'hsl(45, 93%, 47%)',
    indigo: 'hsl(231, 48%, 48%)',
  },
  
  // Neutral Colors
  neutral: {
    50: 'hsl(210, 40%, 98%)',
    100: 'hsl(210, 40%, 96%)',
    200: 'hsl(214, 32%, 91%)',
    300: 'hsl(213, 27%, 84%)',
    400: 'hsl(215, 20%, 65%)',
    500: 'hsl(215, 16%, 47%)',
    600: 'hsl(215, 19%, 35%)',
    700: 'hsl(215, 25%, 27%)',
    800: 'hsl(217, 33%, 17%)',
    900: 'hsl(222, 84%, 5%)',
  },
} as const;

// Typography System
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Spacing System (based on 4px grid)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Shadow System
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

// Animation System
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Component Variants
export const componentVariants = {
  button: {
    size: {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm,
        borderRadius: borderRadius.md,
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize.base,
        borderRadius: borderRadius.md,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[6]}`,
        fontSize: typography.fontSize.lg,
        borderRadius: borderRadius.lg,
      },
    },
    
    variant: {
      primary: {
        backgroundColor: colors.primary[500],
        color: 'white',
        border: 'none',
        boxShadow: shadows.sm,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.primary[500],
        border: `2px solid ${colors.primary[500]}`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colors.neutral[700],
        border: 'none',
      },
    },
  },
  
  card: {
    variant: {
      default: {
        backgroundColor: 'white',
        border: `1px solid ${colors.neutral[200]}`,
        borderRadius: borderRadius.xl,
        boxShadow: shadows.sm,
        padding: spacing[6],
      },
      elevated: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: borderRadius.xl,
        boxShadow: shadows.lg,
        padding: spacing[8],
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `2px solid ${colors.neutral[200]}`,
        borderRadius: borderRadius.xl,
        padding: spacing[6],
      },
    },
  },
} as const;

// Utility Classes Generator
export const generateUtilityClasses = () => {
  return {
    // Spacing utilities
    spacing: Object.entries(spacing).reduce((acc, [key, value]) => {
      acc[`p-${key}`] = { padding: value };
      acc[`px-${key}`] = { paddingLeft: value, paddingRight: value };
      acc[`py-${key}`] = { paddingTop: value, paddingBottom: value };
      acc[`m-${key}`] = { margin: value };
      acc[`mx-${key}`] = { marginLeft: value, marginRight: value };
      acc[`my-${key}`] = { marginTop: value, marginBottom: value };
      return acc;
    }, {} as Record<string, any>),
    
    // Color utilities
    colors: Object.entries(colors.feature).reduce((acc, [name, value]) => {
      acc[`text-${name}`] = { color: value };
      acc[`bg-${name}`] = { backgroundColor: value };
      acc[`border-${name}`] = { borderColor: value };
      return acc;
    }, {} as Record<string, any>),
  };
};

// Design Tokens Export
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  componentVariants,
} as const;

// CSS Custom Properties Generator
export const generateCSSCustomProperties = () => {
  const cssVars: Record<string, string> = {};
  
  // Primary colors
  Object.entries(colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });
  
  // Feature colors
  Object.entries(colors.feature).forEach(([name, value]) => {
    cssVars[`--color-${name}`] = value;
  });
  
  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Typography
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  return cssVars;
};

// Theme Configuration
export const theme = {
  light: {
    background: colors.neutral[50],
    foreground: colors.neutral[900],
    card: 'white',
    cardForeground: colors.neutral[900],
    muted: colors.neutral[100],
    mutedForeground: colors.neutral[500],
    border: colors.neutral[200],
    primary: colors.primary[500],
    primaryForeground: 'white',
    secondary: colors.neutral[100],
    secondaryForeground: colors.neutral[900],
  },
  
  dark: {
    background: colors.neutral[900],
    foreground: colors.neutral[50],
    card: colors.neutral[800],
    cardForeground: colors.neutral[50],
    muted: colors.neutral[800],
    mutedForeground: colors.neutral[400],
    border: colors.neutral[700],
    primary: colors.primary[400],
    primaryForeground: colors.neutral[900],
    secondary: colors.neutral[800],
    secondaryForeground: colors.neutral[50],
  },
} as const;

export type Theme = typeof theme.light;
export type ColorScale = typeof colors.primary;
export type FeatureColor = keyof typeof colors.feature;