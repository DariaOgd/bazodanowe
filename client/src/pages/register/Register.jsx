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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("auth/register", {
        ...user,
      });
      setShowSuccessMessage(true); 
      setTimeout(() => {
        setShowSuccessMessage(false); 
        navigate("/login"); 
      }, 2000); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Zarejestruj się</h1>
        <label htmlFor="email"></label>
        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Email' />
        <label htmlFor="password"></label>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='Hasło' />
        <label htmlFor="name"></label>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder='Imię' />
        {/* <label htmlFor="address"></label>
        <input type="text" name="address" value={user.address} onChange={handleChange} placeholder='Adres' /> */}
        <button type="submit">Zarejestruj się</button>
        <a href="/login">Masz juz konto?</a>
      </form>
      {showSuccessMessage && (
        // Display alert using browser's built-in alert function
        alert("Konto zostało utworzone!")
      )}
      
    </div>
  );
}

export default Register;
