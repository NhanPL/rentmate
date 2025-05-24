import loginBg from '@/assets/images/login-bg.jpg';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    console.log('first render');
  }, []);
  return (
    <Box
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen relative font-sans"
      id="login-page"
    >
      <Box className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />
      <Box className="relative z-10 flex items-center justify-center min-h-screen px-4">{children}</Box>
    </Box>
  );
};

export default CommonLayout;
