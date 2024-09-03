import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3001/issues";

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setIssues(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleCreate = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: issues.length + 1, ...newIssue }),
    })
      .then((response) => response.json())
      .then((data) => setIssues([...issues, data]))
      .catch((error) => console.error("Error creating issue:", error));
  };

  const handleUpdate = (id) => {
    const updatedIssue = {
      id,
      title: `Updated ${id}`,
      description: `Updated description ${id}`,
    };
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((response) => response.json())
      .then((data) =>
        setIssues(issues.map((issue) => (issue.id === id ? data : issue)))
      )
      .catch((error) => console.error("Error updating issue:", error));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setIssues(issues.filter((issue) => issue.id !== id)))
      .catch((error) => console.error("Error deleting issue:", error));
  };

  return (
    <div className="container">
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <span>
              {issue.title} - {issue.description}
            </span>
            <div>
              <button onClick={() => handleUpdate(issue.id)}>Update</button>
              <button onClick={() => handleDelete(issue.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Create New Issue</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newIssue.description}
          onChange={(e) =>
            setNewIssue({ ...newIssue, description: e.target.value })
          }
        />
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default App;
