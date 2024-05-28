import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarDefault from '../../components/navbar/NavbarDefault';
import './Orders.scss';
import Footer from "../../components/Footer";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get current user

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!currentUser) {
          console.error('No current user found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:8800/api/orders/user', {
          params: {
            userId: currentUser._id, // Pass user ID as query parameter
          },
        });
        console.log('Orders response:', response.data); // Log the response
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container-orders">
      <NavbarDefault /> {/* Ensure the Navbar is included here */}
      <div className="orders-container">
        <h1>Your Orders</h1>
        <hr/>
        {orders.length === 0 ? (
          <p className="no-orders">You have no orders</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <h2>Order ID: {order._id}</h2>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Status: {order.status}</p>
                <div className="order-products">
                  {order.products.map((product) => (
                    <div key={product.productId._id} className="product-item">
                      <img src={product.productId.images[0]} alt={product.productId.title} />
                      <div className="product-details">
                        <h3>{product.productId.title}</h3>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.productId.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default UserOrders;
