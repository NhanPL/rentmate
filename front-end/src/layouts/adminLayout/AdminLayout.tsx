import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';
import Header from '../../components/header/Header';
import SideBar from '../../components/sideBar/SideBar';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Paper
      elevation={0}
      className="rounded-2xl backdrop-blur-2xl shadow-xl"
      sx={{ display: 'flex', width: '90%', height: '90vh', overflow: 'hidden' }}
    >
      <Box component="nav" sx={{ width: '240px', bgcolor: 'background.paper', borderRight: '1px solid #e0e0e0' }}>
        <SideBar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Header />
        <Box
          sx={{
            height: 'calc(100% - 64px)',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminLayout;
