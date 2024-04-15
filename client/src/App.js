import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient(); // Create the QueryClient instance

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter> {/* Wrap your app with BrowserRouter */}
          <Routes>
           
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />  {/* Your existing Login component */}
{/* Your existing Login component */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
