import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typograhy';

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary.normal,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: '#FFFFFF',
        100: colors.primary[100],
      },
      secondary: {
        main: colors.secondary.normal,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: colors.primary.normal,
        100: colors.secondary[100],
      },
      action: {
        disabled: colors.neutral[90],
        selected: colors.primary[10],
      },
      text: {
        disabled: colors.neutral[50], 
      },

    },
      typography: {
        fontFamily: 'Pretendard',
        h1: {
          ...typography.xxlarge1,
        },
        h2: {
          ...typography.xxlarge2,
        },
        h3: {
          ...typography.xxlarge1,
        },
        h4: {
          ...typography.xlargeBold,
        },
        h5: {
          ...typography.xlargeSemibold,
        },
        h6: {
          ...typography.xlargeMed,
        },
        subtitle1:{
          ...typography.largeSemibold,
        },

        subtitle2:{
          ...typography.largeMed,
        },
        body1: {
          ...typography.largeLight,
        },
        body2: {
          ...typography.mediumBold,
        },
    },

  });

export default theme;