import React, { useState } from "react";
import "./AdminLogin.css";

const API = "https://starlinegroup.ae/api"; // ✅ FIXED API BASE URL

export default function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        window.location.href = "/AdminMain";
      } else {
        setMsg(data.message || "Login failed");
      }
    } catch (error) {
      setMsg("Server unreachable");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="company-title">⭐ STARLINE</h1>
        <h2 className="login-title">Admin Login</h2>

        {msg && <p className="error-msg">{msg}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
