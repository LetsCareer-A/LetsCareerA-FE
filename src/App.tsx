import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 추가적인 라우트 설정 */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function Home() {
  return <div>Home Page</div>;
}

export default App;
