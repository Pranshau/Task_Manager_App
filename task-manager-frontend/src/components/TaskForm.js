import React, { useState } from "react";
import API from "../api";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tasks", {
        title,
        description,
        dueDate,
        status,
      });
      onTaskCreated(res.data);

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <label htmlFor="taskTitle">Title</label>
      <input
        type="text"
        id="taskTitle"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginLeft: 10, marginRight: 10, padding: 5 }}
      />

      <label htmlFor="taskDescription">Description</label>
      <input
        type="text"
        id="taskDescription"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginLeft: 10, marginRight: 10, padding: 5 }}
      />

      <label htmlFor="taskDueDate">Due Date</label>
      <input
        type="date"
        id="taskDueDate"
        name="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginLeft: 10, marginRight: 20, padding: 5 }}
      />

      <label htmlFor="taskStatus">Status</label>
      <select
        id="taskStatus"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10, padding: 5 }}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
