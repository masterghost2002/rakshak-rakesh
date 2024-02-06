import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
const defaultTheme = createTheme();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
