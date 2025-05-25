import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <nav>{/* Navigation items can go here */}</nav>
    </Box>
  );
};

export default Header;
