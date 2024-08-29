import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';
import theme from './styles/theme';

// import Retrospective from './pages/Retrospective'; // 회고 보드 페이지
// import CareerBoard from './pages/CareerBoard'; // 커리어 보드 페이지

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
            <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
