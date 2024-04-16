import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NavbarDefault from './components/navbar/NavbarDefault';

const queryClient = new QueryClient(); // Create the QueryClient instance

function App() {
  return (
    <>
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter> {/* Wrap your app with BrowserRouter */}
          <NavbarDefault />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />  {/* Your existing Login component */}
{/* Your existing Login component */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
    </>
  );
}

export default App;
