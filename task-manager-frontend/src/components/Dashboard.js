import React, { useState, useEffect } from "react";
import API from "../api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../components/dashboard.css";

const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(getStoredUser());

  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [adminMessage, setAdminMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch tasks (admin fetches all)
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!user || !token) return;

    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status, page, limit: 5 },
      });
      setTasks(res.data.tasks || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setTasks([]);
    }
  };

  // Fetch tasks
  useEffect(() => {
    if (!user) return;
    fetchTasks();
  }, [search, status, page, user]);

  // Task handlers
  const handleTaskCreated = (newTask) => setTasks([newTask, ...tasks]);
  const handleTaskUpdated = (updatedTask) =>
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  const handleTaskDeleted = (taskId) =>
    setTasks(tasks.filter((t) => t._id !== taskId));

  // Admin: create new admin
  const handleCreateAdmin = async () => {
    const { username, email, password } = newAdminData;
    if (!username || !email || !password) {
      setAdminMessage("All fields are required.");
      return;
    }
    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
        role: "admin",
      });
      setAdminMessage(`New admin "${username}" created successfully!`);
      setShowAddAdminForm(false);
      setNewAdminData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Error adding admin:", err);
      setAdminMessage("Failed to create admin. Check console.");
    }
  };

  return (
    <>
      <Navbar username={user?.username} onLogout={handleLogout} />

      <div className="dashboard-container">
        <TaskForm onTaskCreated={handleTaskCreated} />

        {/* Search + Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <h2>{user?.role === "admin" ? "All Users Tasks" : "Your Tasks"}</h2>

        <ul className="task-list">
          {tasks.length === 0 && <p>No tasks found.</p>}
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              user={user || { role: "user" }}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}
        </ul>

        {/* Admin buttons */}
        {user?.role === "admin" && (
          <div style={{ marginTop: "20px", paddingBottom: "20px" }}>
            {/* <button onClick={fetchTasks}>Refresh All Tasks</button>*/}
            <button onClick={() => setShowAddAdminForm(!showAddAdminForm)}>
              {showAddAdminForm ? "Cancel" : "Add Admin"}
            </button>
            {showAddAdminForm && (
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #ccc",
                  padding: "20px",
                  width: "300px",
                }}
              >
                <label htmlFor="adminUsername">Username</label>
                <input
                  type="text"
                  id="adminUsername"
                  name="username"
                  placeholder="Username"
                  value={newAdminData.username}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      username: e.target.value,
                    })
                  }
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    width: "100%",
                  }}
                />

                <label htmlFor="adminEmail">Email</label>
                <input
                  type="email"
                  id="adminEmail"
                  name="email"
                  placeholder="Email"
                  value={newAdminData.email}
                  onChange={(e) =>
                    setNewAdminData({ ...newAdminData, email: e.target.value })
                  }
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    width: "100%",
                  }}
                />

                <label htmlFor="adminPassword">Password</label>
                <input
                  type="password"
                  id="adminPassword"
                  name="password"
                  placeholder="Password"
                  value={newAdminData.password}
                  onChange={(e) =>
                    setNewAdminData({
                      ...newAdminData,
                      password: e.target.value,
                    })
                  }
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    width: "100%",
                  }}
                />

                <button onClick={handleCreateAdmin}>Create Admin</button>
                {adminMessage && (
                  <p style={{ marginTop: "5px", color: "green" }}>
                    {adminMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
