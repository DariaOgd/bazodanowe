import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import newRequest from '../../utils/newRequest';
import "./Register.scss";

function Register() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    address: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      await newRequest.post("auth/register", {
        ...user,
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 409) { 
        setErrorMessage('Email already in use. Please use a different email.');
      } else {
        console.log(err);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 className='signup'>Sign Up</h1>
        <label htmlFor="email"></label>
        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Email' />
        <label htmlFor="password"></label>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='Password' />
        <label htmlFor="name"></label>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder='Name' />
        {/* <label htmlFor="address"></label>
        <input type="text" name="address" value={user.address} onChange={handleChange} placeholder='Adres' /> */}
        <button type="submit">Sign Up</button>
        {showSuccessMessage && (
        // Display alert using browser's built-in alert function
        alert("Account created!")
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
        <a id="redirect-link" href="/login">Already have an account?</a>
      </form>
     
    </div>
  );
}

export default Register;




