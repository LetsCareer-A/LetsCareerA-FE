import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
    </ThemeProvider>
  );
}


export default App;
