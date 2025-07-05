import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/rooms': 'Rooms',
  '/tenants': 'Tenants',
  '/properties': 'Properties',
  '/reports': 'Reports',
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const title =
    Object.entries(routeTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([route]) => pathname.includes(route))?.[1] || 'Dashboard';

  return (
    <Box
      sx={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      {children}
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <nav>{/* Navigation items can go here */}</nav>
    </Box>
  );
};

export default Header;
