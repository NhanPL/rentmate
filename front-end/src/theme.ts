import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1836',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D7F1FF',
      contrastText: '#000',
    },
    background: {
      default: '#FAFBFD',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {
            backgroundColor: '#0D1836 !important',
            color: '#fff !important',
          },
          '&:hover': {
            backgroundColor: '#0D1836',
            color: '#fff',
            transition: 'background-color 0.5s ease-in-out',
          },
        },
      },
    },
  },
});

export default theme;
