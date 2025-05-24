import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const SideBar = () => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSelectedIndex(() => {
      switch (location.pathname) {
        case '/dashboard':
          return 0;
        case '/properties':
          return 1;
        case '/tenants':
          return 2;
        case '/reports':
          return 3;
        default:
          return 0;
      }
    });
  }, [location.pathname]);
  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', border: '1px solid #e0e0e0' }}>
      <Typography variant="h4" sx={{ padding: '16px', color: '#0D1836', fontWeight: '800', textAlign: 'center' }}>
        Rent Mate
      </Typography>
      <Box sx={{ padding: '16px' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" selected={selectedIndex === 0}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/properties" selected={selectedIndex === 1}>
              <ListItemText primary="Properties" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/tenants" selected={selectedIndex === 2}>
              <ListItemText primary="Tenants" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reports" selected={selectedIndex === 3}>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
