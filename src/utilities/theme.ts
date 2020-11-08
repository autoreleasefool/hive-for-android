import {createTheme} from '@shopify/restyle';

const palette = {
  primaryRed: 'rgb(238, 82, 83)',
  primaryRedTransparent: 'rgba(238, 82, 83, 0.7)',

  primaryGreyLight: 'rgb(44, 57, 72)',
  primaryGreyLightTransparent: 'rgba(44, 57, 72, 0.7)',
  primaryGrey: 'rgb(34, 47, 62)',
  primaryGreyTransparent: 'rgba(34, 47, 62, 0.7)',
  primaryGreyDark: 'rgb(24, 37, 52)',
  primaryGreyDarkTransparent: 'rgba(24, 37, 52, 0.7)',

  yellow: '#FECA57',
  green: '#10AC84',

  white: '#FFFFFF',
  transparentWhite: 'rgba(255, 255, 255, 0.7)',

  black: '#172434',
  transparentBlack: 'rgba(24, 37, 52, 0.7)',
};

export const theme = createTheme({
  colors: {
    primary: palette.primaryRed,
    primaryTransparent: palette.primaryRedTransparent,
    secondary: palette.primaryGreyLight,
    secondaryTransparent: palette.primaryGreyLightTransparent,

    background: palette.primaryGrey,
    backgroundLight: palette.primaryGreyLight,
    backgroundDark: palette.primaryGreyDark,

    textPrimary: palette.white,
    textSecondary: palette.transparentWhite,
    textContrasting: palette.black,
    textContrastingSecondary: palette.transparentBlack,

    highlightSuccess: palette.green,
    highlightWarning: palette.yellow,
    highlightDanger: palette.primaryRed,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadii: {
    s: 4,
    m: 8,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'textPrimary',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'textPrimary',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
  },
});

export type Theme = typeof theme;

export const darkTheme: Theme = theme;

// export const darkTheme: Theme = {
//   ...theme,
//   colors: {
//     ...theme.colors,

//     background: palette.white,

//     textPrimary: palette.white,
//     textSecondary: palette.transparentWhite,
//     textContrasting: palette.black,
//   },
// };
