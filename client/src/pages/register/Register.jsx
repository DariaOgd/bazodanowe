import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import newRequest from '../../utils/newRequest';
import "./Register.scss"
function Register(){
  const [user,setUser] = useState({
    email: '',
    password: '',
    name: '',
    address: ''
  })
  const navigate = useNavigate();

  console.log(user)

  const handleChange = (e)=>{
    setUser(prev =>{
      return{...prev, [e.target.name]: e.target.value}
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await newRequest.post("auth/register", {
        ...user,

      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Zarejestruj się</h1>
        <label htmlFor="email"></label>
        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Email'/>
        <label htmlFor="password"></label>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder='Hasło'/>
        <label htmlFor="name"></label>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder='Imię' />
        <label htmlFor="address"></label>
        <input type="text" name="address" value={user.address} onChange={handleChange} placeholder='Adres' />
        <button type="submit">Zarejestruj się</button>
        <a href="/login">Masz juz konto?</a>
      </form>
    </div>
  )

}
export default Register