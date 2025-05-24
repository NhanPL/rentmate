import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
