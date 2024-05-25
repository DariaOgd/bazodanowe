import React from 'react';
import { useCart } from '../../context/cartContext';
import NavbarDefault from '../../components/navbar/NavbarDefault';
import "./Cart.scss";

function Cart() {
  const { cart, removeFromCart } = useCart();

  if (!cart || !cart.items) {
    return <div className="cart-container">Loading...</div>; // Show loading state if cart is not loaded
  }

  const handleRemoveFromCart = async (productId) => {

    await removeFromCart(productId);
    window.location.reload()
  };

  return (
    <div className="container">
             <NavbarDefault />
            <div className="cart-container">
       {/* Add Navbar at the top */}
      <h1>Your Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.items.map((product) => (
            <li key={product.productId._id} className="cart-item">
              {product.productId.images && product.productId.images.length > 0 && (
                <img src={product.productId.images[0]} alt={product.productId.title} />
              )}
              <div className="product-details">
                <h2>{product.productId.title}</h2>
                <p>Price: ${product.productId.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveFromCart(product.productId._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    </div>

  );
}

export default Cart;
