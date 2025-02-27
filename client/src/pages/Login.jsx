// src/pages/Login.js
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { login } from "../services/connection";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        Email: email,
        Password: password,
      });

      if (response.success) {
        authLogin(response.data);

        toast.success("Login successful");

        navigate(response.data.roleUser === "A" ? "/admin" : "/profile");
      } else {
        toast.error(response.error || "Login failed");
      }
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form className="login-form" onSubmit={onSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="email"
          required
        />
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="password"
          required
        />
      
        <button className="submit-button" type="submit">
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
