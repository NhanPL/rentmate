import { Paper, Typography } from '@mui/material';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Paper
      elevation={0}
      className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-xl"
    >
      <Typography variant="h4" align="center" className="font-bold mb-2">
        Welcome to <span className="text-cyan-300">RentMate</span>
      </Typography>
      <Typography variant="body2" align="center" className="mb-6 text-gray-300">
        Manage your rental paradise 🌴
      </Typography>
      <LoginForm />
      <Typography
        align="center"
        variant="body2"
        className="mt-4 text-gray-300 hover:text-cyan-400 transition cursor-pointer"
      >
        Forgot password?
      </Typography>
    </Paper>
  );
}
