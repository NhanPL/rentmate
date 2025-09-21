import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import './App.css';
import AppLoadingProvider from './contexts/AppLoadingProvider';
import AppRouter from './routes/Router';
import { store } from './stores/index';
import theme from './theme';

function App() {
  return (
    <div className="h-screen w-full">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppLoadingProvider>
            <CssBaseline />
            <AppRouter />
          </AppLoadingProvider>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
