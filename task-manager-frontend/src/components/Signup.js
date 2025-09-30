import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import API from "../api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
        role,
      });

      // Saving token and user data
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert("Signup successful! Redirecting to Dashboard...");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(
        err.response?.data?.message || "Error signing up, please try again"
      );
      console.error("Signup error:", err.response?.data);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ACB6E5 0%, #74ebd5 100%)",
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
        }}
      >
        <FaTasks
          style={{ fontSize: "48px", color: "#007bff", marginBottom: "15px" }}
        />
        <h2 style={{ marginBottom: "10px", color: "#333" }}>Create Account</h2>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Sign up to start managing your tasks
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="signupUsername"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            type="email"
            id="signupEmail"
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
            id="signupPassword"
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          >
            <option value="user">User</option>
            <option value="admin" disabled>
              Admin (Cannot self-register)
            </option>
          </select>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
