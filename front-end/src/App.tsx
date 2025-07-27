import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import AppRouter from './routes/Router';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './stores/index';

function App() {
  return (
    <div className="h-screen w-full">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
