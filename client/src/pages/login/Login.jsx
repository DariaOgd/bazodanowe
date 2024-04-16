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
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Zaloguj się</h1>
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
          placeholder="Hasło"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj się</button>
        {error && error}
        <a href="/register">Nie masz konta?</a>

      </form>
    </div>
  );
}

export default Login;