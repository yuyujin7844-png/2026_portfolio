import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#EE6B5F',
      main: '#E83A29',
      dark: '#AE2C1F',
      contrastText: '#FFFEEF',
    },
    secondary: {
      main: '#FFE8DA',
      contrastText: '#E83A29',
    },
    background: {
      default: '#FFFEEF',
      paper: '#FFE8DA',
    },
    text: {
      primary: '#E83A29',
      secondary: '#333333',
      disabled: '#999999',
    },
    accent: {
      main: '#F49C8C',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
  spacing: 8,
});

export default theme;
