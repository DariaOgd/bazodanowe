import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="body">
       <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
        </div>
        <h1 className="signin">Sign In</h1>
        <label htmlFor=""></label>
        <input
          name="Email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor=""></label>
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        {error && error}
        <a id="redirect-link"href="/register">Don't have an account?</a>

      </form>
    </div>
    <div className="right">
      <img src="img.svg" alt="" />
    </div>

    </div>
   
  );
}

export default Login;