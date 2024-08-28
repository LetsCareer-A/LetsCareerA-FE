import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './componenets/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <Navbar/>
  );
}


export default App;
