import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Textfield from './components/TextField';
import InputBox from './components/InputBox';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Footer/>
    </ThemeProvider>
  );
}


export default App;
