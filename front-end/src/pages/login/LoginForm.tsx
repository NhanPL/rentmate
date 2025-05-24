import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="gap-4">
      <TextField
        {...register('email', { required: true })}
        fullWidth
        label="Email"
        variant="outlined"
        className="mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={20} className="text-cyan-300" />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { color: '#ccc' } }}
        sx={{
          input: { color: '#fff' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#22d3ee',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22d3ee',
              boxShadow: '0 0 0 2px rgba(34,211,238,0.3)',
            },
            '&:-webkit-autofill': {
              backgroundColor: 'transparent !important', // Giữ nguyên màu nền
            },
          },
        }}
      />

      <TextField
        {...register('password', { required: true })}
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        className="mb-6"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock size={20} className="text-cyan-300" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ style: { color: '#ccc' } }}
        sx={{
          input: { color: '#fff' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#22d3ee',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22d3ee',
              boxShadow: '0 0 0 2px rgba(34,211,238,0.3)',
            },
          },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        className="rounded-xl py-3 text-lg font-semibold normal-case transition-all"
        sx={{
          background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
          boxShadow: '0 4px 20px rgba(59,130,246,0.5)',
          ':hover': {
            background: 'linear-gradient(to right, #0891b2, #2563eb)',
          },
        }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
