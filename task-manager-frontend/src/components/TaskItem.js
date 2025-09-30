import React, { useState, useEffect } from "react";
import API from "../api";

function TaskItem({ task, user, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "pending");
  const [canEditOrDelete, setCanEditOrDelete] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  // Check if task is overdue
  useEffect(() => {
    if (task.dueDate && status !== "completed") {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        setIsOverdue(true);
        if (status !== "overdue") {
          setStatus("overdue");
        }
      } else {
        setIsOverdue(false);
      }
    }
  }, [task.dueDate, status]);

  useEffect(() => {
    if (!user) {
      setCanEditOrDelete(false);
      return;
    }
    if (user.role === "admin") {
      setCanEditOrDelete(true);
      return;
    }
    const taskUserId = task.user?._id || task.user;
    const currentUserId = user._id;
    if (taskUserId && currentUserId && taskUserId === currentUserId) {
      setCanEditOrDelete(true);
    } else {
      setCanEditOrDelete(false);
    }
  }, [task, user]);

  const handleUpdate = async () => {
    try {
      const finalStatus = isOverdue ? "overdue" : status;
      const res = await API.put(`/tasks/${task._id}`, {
        title,
        description,
        status: finalStatus,
      });
      onTaskUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      if (user.role === "admin") {
        await API.delete(`/tasks/${task._id}/admin`);
      } else {
        await API.delete(`/tasks/${task._id}`);
      }
      onTaskDeleted(task._id);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleMarkComplete = async () => {
    try {
      const res = await API.put(`/tasks/${task._id}`, { status: "completed" });
      setStatus("completed");
      setIsOverdue(false);
      onTaskUpdated(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to mark as complete");
    }
  };

  return (
    <div
      className="task-card"
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: isOverdue ? "#fff0f0" : "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        minHeight: "120px",
      }}
    >
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            placeholder="Description"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleUpdate}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Task Header */}
          <div style={{ marginBottom: "15px" }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
                color: "#333",
              }}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                {task.description}
              </p>
            )}
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              {isOverdue && (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "12px",
                    padding: "2px 8px",
                    backgroundColor: "#ffebee",
                    borderRadius: "12px",
                  }}
                >
                  OVERDUE
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Mark Complete Button */}
            {(status === "pending" || status === "overdue") && (
              <button
                onClick={handleMarkComplete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ✅ Mark Complete
              </button>
            )}

            {/* Completed Status */}
            {status === "completed" && (
              <span
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ✅ Completed
              </span>
            )}

            {/* Edit Button */}
            {canEditOrDelete &&
              (status === "pending" || status === "overdue") && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ✏️ Edit
                </button>
              )}

            {/* Delete Button */}
            {canEditOrDelete && (
              <button
                onClick={handleDelete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                🗑️ Delete
              </button>
            )}
          </div>

          {/* Status Badge */}
          <div
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Status:</span>
            <span
              style={{
                fontWeight: "bold",
                color:
                  status === "completed"
                    ? "green"
                    : isOverdue
                    ? "red"
                    : "orange",
              }}
            >
              {status === "completed"
                ? "Completed"
                : isOverdue
                ? "Overdue"
                : "Pending"}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
