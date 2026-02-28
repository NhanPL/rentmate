import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { logout } from '../../stores/slices/authSlice';
import { logoutUser } from '../../api/auth';
import { AuthState } from '../../types';
import { useSelector } from 'react-redux';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/rooms': 'Rooms',
  '/tenants': 'Tenants',
  '/apartments': 'Apartments',
  '/reports': 'Reports',
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const { refreshToken } = useSelector((state: { auth: AuthState }) => state.auth);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title =
    Object.entries(routeTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([route]) => pathname.includes(route))?.[1] || 'Dashboard';

  const handleLogout = async () => {
    await logoutUser(refreshToken || '');
    dispatch(logout());
    navigate('/');
  };

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
      <div className="flex items-center">
        {children}
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </div>
      <Button onClick={handleLogout} variant="outlined">
        Logout
      </Button>
    </Box>
  );
};

export default Header;
