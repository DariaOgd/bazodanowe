import React, { useState } from 'react';
import { useCart } from '../../context/cartContext';
import NavbarDefault from '../../components/navbar/NavbarDefault';
import './Cart.scss';

function Cart() {
  const { cart, removeFromCart } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  if (!cart || !cart.items) {
    return <div className="cart-container">Loading...</div>; // Show loading state if cart is not loaded
  }

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    window.location.reload();
  };

  // Calculate the total amount
  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    // Implement payment processing logic here
    console.log('Processing payment with card number:', cardNumber);
    // Simulate payment processing delay
    setTimeout(() => {
      setPaymentProcessing(false);
      alert('Payment successful!');
    }, 2000);
  };

  return (
    <div className="container-cart">
      <NavbarDefault />
      <div className="cart-and-payment">
        <div className="cart-container">
          <h1>Your Shopping Cart</h1>
          {cart.items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.items.map((product) => (
                  <li key={product.productId._id} className="cart-item">
                    {product.productId.images && product.productId.images.length > 0 && (
                      <img src={product.productId.images[0]} alt={product.productId.title} />
                    )}
                    <div className="product-details">
                      <h2>{product.productId.title}</h2>
                      <p>Price: ${product.productId.price}</p>
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
              <div className="total-amount">
                <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
              </div>
            </>
          )}
        </div>
        <div className="payment-form">
          <form onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="payment-button" disabled={paymentProcessing}>
              {paymentProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
