import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import AppRouter from './routes/Router';
import theme from './theme';

function App() {
  return (
    <div className="h-screen w-full">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
