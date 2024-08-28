import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
    <Navbar/>
    <Footer/>
    </div>

  );
}


export default App;
