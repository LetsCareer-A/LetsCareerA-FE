import { createTheme } from '@mui/material/styles';

const colors ={
    primary: {
      normal: '#4D55F5',
      dark: '#4138A3',
      light: '#757BFF',
      xLight: '#A9C1FF',
      100: '#4D55F5',
      90: '#6269F6',
      80: '#8D92F9',
      70: '#A2A7FA',
      60: '#B1B4FB',
      50: '#BFC2FB',
      40: '#D8DAFD',
      30: '#E3E4FD',
      20: '#EAEBFE',
      10: '#F1F1FE',
      0: '#FFFFFF',

    },
    secondary: {
      normal: '#1BC47D',
      dark: '#009C89',
      light: '#43EC91',
      100: '#1BC47D',
      90: '#32CABA',
      80: '#49D097',
      70: '#60D6A4',
      60: '#76DCB1',
      50: '#1BC47D',
      40: '#8CE1BD',
      30: '#BBEED8',
      20: '#D1F3E5',
      10: '#E9FAF2',
      0: '#FFFFFF',
    },
    tertiary: {
      Normal: '#CB81F2',
    },
    point: {
      light: '#DAFF7C',
    },
    system: {
      PositiveGreen: '#1BC47D',
      PositiveBlue: '#5177FF',
      Error: '#F64E39',
    },
    static: {
      100: '#FFFFFF',
      0: '#000000',
    },
    neutral: {
      0: '#27272D',
      10: '#2A2D34',
      20: '#3E4148',
      30: '#4C4F56',
      35: '#5C5F66',
      40: '#7A7D84',
      45: '#989BA2',
      50: '#ACAFB6',
      60: '#BDBDBD',
      70: '#CFCFCF',
      80: '#E7E7E7',
      85: '#EFEFEF',
      90: '#F3F3F3',
      95: '#F9F9F8',
      100: '#FAFAFA',
    },
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary.normal,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: colors.secondary.normal,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: colors.primary.normal,
      },
      action: {
        disabled: colors.neutral[90], // disabled 상태 색상
      },
      text: {
        disabled: colors.neutral[50], // disabled 상태 텍스트 색상
      },
    },

  });

export default theme;