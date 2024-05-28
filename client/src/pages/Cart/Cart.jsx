import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import NavbarDefault from '../../components/navbar/NavbarDefault';
import './Cart.scss';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import axiosInstance from './axios.Instance.js'; // Import the Axios instance
import { isValidCardNumber, isValidExpiryDate, isValidCVV } from './validation';
import Footer from "../../components/Footer";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps
  } = usePaymentInputs();

  if (!cart || !cart.items) {
    return <div className="cart-container">Loading...</div>;
  }

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId);
    window.location.reload();
  };

  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const cardNumberValue = cardNumber.replace(/\s+/g, ''); // Use the state value directly
    if (
      isValidCardNumber(cardNumberValue) &&
      isValidExpiryDate(expiryDate) &&
      isValidCVV(cvv)
    ) {
      setPaymentProcessing(true);
      try {
        console.log('Sending payment request with data:', {
          totalAmount,
          address,
          city,
          zipCode,
          country,
          products: cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
          })),
          cardNumber: cardNumberValue,
          expiryDate,
          cvv
        });
        const response = await axiosInstance.post('/api/orders/create', {
          totalAmount,
          address,
          city,
          zipCode,
          country,
          products: cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
          })),
          cardNumber: cardNumberValue,
          expiryDate,
          cvv
        });

        console.log('Payment successful:', response.data); // Log success
        alert('Payment successful! Order ID: ' + response.data._id);

        // Clear the cart after successful payment
        await clearCart();

        navigate('/'); // Navigate to the home page

      } catch (error) {
        console.error('Payment error:', error); // Log error
        alert('Payment failed. Please try again.');
      } finally {
        setPaymentProcessing(false);
      }
    } else {
      alert('Please enter valid payment details.');
    }
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
          <form onSubmit={handlePaymentSubmit} id="form-card-payment">
            <div {...wrapperProps} id="payment-div">
                { /*<svg {...getCardImageProps({ images })} /> */}
                <input id="card-number"
                  {...getCardNumberProps({
                    onChange: (e) => setCardNumber(e.target.value)
                  })}
                  required
                />
                <div className="inline-fields">
                  <input id="card-date"
                    {...getExpiryDateProps({
                      onChange: (e) => setExpiryDate(e.target.value)
                    })}
                    required
                  />
                  <input id="card-cvc"
                    {...getCVCProps({
                      onChange: (e) => setCvv(e.target.value)
                    })}
                    required
                  />
                </div>
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
    <Footer></Footer>
    </div>
  );
}

export default Cart;
