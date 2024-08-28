import { createTheme } from '@mui/material/styles';
import colors from './colors';

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

  });

export default theme;