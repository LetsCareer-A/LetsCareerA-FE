import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Dashbord from './pages/index'

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashbord />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}


export default App;
