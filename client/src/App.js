// src/App.js
import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './pages/add/Add';
import UserProfile from './pages/userProfile/userProfile';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Product from './pages/product/Product';
import Edit from './pages/edit/Edit';
import Messages from './pages/messages/Messages';
import Footer from './components/Footer';
import Chat from './pages/chat/Chat';
import Cart from './pages/Cart/Cart'
import { CartProvider } from './context/cartContext'

const queryClient = new QueryClient(); // Create the QueryClient instance

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CartProvider> {/* Wrap with CartProvider */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add" element={<Add />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/chat/123" element={<Chat />} />
              <Route path="/cart" element={<Cart />} /> {/* Add the cart route */}
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
