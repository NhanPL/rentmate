import { Box, Paper } from '@mui/material';
import Header from '../../components/header/Header';
import SideBar from '../../components/sideBar/SideBar';
import Footer from '../../components/footer/Footer';
import { ReactNode } from 'react';

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
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Header />
        <Box
          sx={{
            height: 'calc(100% - 64px - 64px)',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Paper>
  );
};

export default AdminLayout;
