import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa"; 
import API from "../api";

function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: res.data.user._id,  
  username: res.data.user.username,
  role: res.data.user.role
    }));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        {/*Logo / Icon */}
        <FaTasks
          style={{
            fontSize: "48px",
            color: "#007bff",
            marginBottom: "15px",
          }}
        />

        <h2 style={{ marginBottom: "10px", color: "#333" }}>Welcome Back</h2>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Login to continue managing your tasks
        </p>

        <form onSubmit={handleSubmit}>
<input
  type="email"
  id="loginEmail"
  name="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
<input
  type="password"
  id="loginPassword"
  name="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required

            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#007bff", fontWeight: "bold" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
