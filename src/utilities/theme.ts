import {createTheme} from '@shopify/restyle';

const palette = {
  primaryRed: '#ED5252',

  primaryGreyLight: '#182534',
  primaryGrey: '#212E3D',
  primaryGreyDark: '#2C3948',

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

    background: palette.primaryGrey,

    textPrimary: palette.black,
    textSecondary: palette.transparentBlack,
    textContrasting: palette.white,

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
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: palette.black,
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: palette.black,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: palette.black,
    },
  },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,

    background: palette.white,

    textPrimary: palette.white,
    textSecondary: palette.transparentWhite,
    textContrasting: palette.black,
  },
  textVariants: {
    ...theme.textVariants,

    header: {
      ...theme.textVariants.header,
      color: palette.white,
    },
    subheader: {
      ...theme.textVariants.subheader,
      color: palette.white,
    },
    body: {
      ...theme.textVariants.body,
      color: palette.white,
    },
  },
};
