import React from "react";

function Navbar({ username, onLogout }) {
  return (
    <header
      style={{
        background: "#fff",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left: Username */}
      <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
        Welcome, {username || "User"}
      </h2>

      {/* Right: Logout */}
      <button
        onClick={onLogout}
        style={{
          padding: "8px 16px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
