import { Box, Paper, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import Header from '../../components/header/Header';
import SideBar from '../../components/sideBar/SideBar';
import MenuIcon from '@mui/icons-material/Menu';

const SIDEBAR_WIDTH = 240;

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Paper
      elevation={0}
      className="rounded-2xl backdrop-blur-2xl shadow-xl"
      sx={{ display: 'flex', width: '90%', height: '90vh', overflow: 'hidden' }}
    >
      <Box
        component="nav"
        sx={{
          width: openSidebar ? SIDEBAR_WIDTH : 0,
          minWidth: openSidebar ? SIDEBAR_WIDTH : 0,
          bgcolor: 'background.paper',
          borderRight: openSidebar ? '1px solid #e0e0e0' : 'none',
          transition:
            'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1), border-right 0.3s',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ opacity: openSidebar ? 1 : 0, transition: 'opacity 0.2s', height: '100%' }}>
          <SideBar />
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          width: openSidebar ? { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` } : '100%',
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <Header>
          <IconButton onClick={() => setOpenSidebar((prev) => !prev)} sx={{ mr: 2, display: { sm: 'inline-flex' } }}>
            <MenuIcon />
          </IconButton>
        </Header>
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
