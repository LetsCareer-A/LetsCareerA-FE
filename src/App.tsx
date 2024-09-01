import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
<<<<<<< Updated upstream
import Layout from './pages/Layout'; 
import ReviewsPage from './pages/Reviews/ReviewsPage';
import CareersPage from './pages/Careers/CareersPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
=======
import Layout from './pages/Layout';
import Reviews from './pages/Reviews/ReviewsPage';
import Careers from './pages/Careers/CareersPage';
>>>>>>> Stashed changes

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
<<<<<<< Updated upstream
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/careers" element={<CareersPage />} />
=======
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/careers" element={<Careers />} />
>>>>>>> Stashed changes
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
