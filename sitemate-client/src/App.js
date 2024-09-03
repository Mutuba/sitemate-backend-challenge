import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create issue.");
        return response.json();
      })
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => setError("Error fetching issues: " + error.message));
  }, []);

  const handleCreate = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: issues.length + 1, ...newIssue }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create issue.");
        return response.json();
      })
      .then((data) => {
        setIssues([...issues, data]);
        setNewIssue({ title: "", description: "" });
        setSuccess("Issue created successfully!");
      })
      .catch((error) => setError("Error creating issue: " + error.message));
  };

  const handleUpdate = () => {
    if (currentIssue) {
      fetch(`${API_URL}/${currentIssue.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentIssue),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to update issue.");
          return response.json();
        })
        .then((data) => {
          setIssues(
            issues.map((issue) => (issue.id === data.id ? data : issue))
          );
          setIsModalOpen(false);
          setCurrentIssue(null);
          setSuccess("Issue updated successfully!");
        })
        .catch((error) => setError("Error updating issue: " + error.message));
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete issue.");

        setIssues((prevIssues) =>
          prevIssues.filter((issue) => issue.id !== id)
        );
        setSuccess("Issue deleted successfully!");
      })

      .catch((error) => setError("Error deleting issue: " + error.message));
  };

  const openUpdateModal = (issue) => {
    setCurrentIssue(issue);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setCurrentIssue({ ...currentIssue, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Issues</h1>
      {error && <h4 className="error-message">{error}</h4>}
      {success && <h4 className="success-message">{success}</h4>}
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <span>
              {issue.title} - {issue.description}
            </span>
            <div>
              <button onClick={() => openUpdateModal(issue)}>Update</button>
              <button onClick={() => handleDelete(issue.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {!isModalOpen && (
        <>
          <h2>Create New Issue</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Title"
              value={newIssue.title}
              onChange={(e) =>
                setNewIssue({ ...newIssue, title: e.target.value })
              }
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
        </>
      )}

      {isModalOpen && currentIssue && (
        <div className="modal">
          <h2>Update Issue</h2>
          <input
            type="text"
            name="title"
            value={currentIssue.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={currentIssue.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
