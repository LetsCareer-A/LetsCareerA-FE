import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Layout from './pages/Layout'; 
import ReviewsPage from './pages/Reviews/ReviewsPage';
import CareersPage from './pages/Careers/CareersPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import StepDetailPage from './pages/StepDetail/StepDetailPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
<StepDetailPage/>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;