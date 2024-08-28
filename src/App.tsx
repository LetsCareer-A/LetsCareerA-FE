import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
    <Navbar/>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 화면 전체 높이
        backgroundColor: '#f0f0f0', // 배경색
      }}
    >
      <Toast />
    </Box>
    <Footer/>
    </div>

  );
}


export default App;
