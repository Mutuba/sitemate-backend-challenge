import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);

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
      .then((data) => {
        setIssues([...issues, data]);
        setNewIssue({ title: "", description: "" });
      })
      .catch((error) => console.error("Error creating issue:", error));
  };

  const handleUpdate = () => {
    if (currentIssue) {
      fetch(`${API_URL}/${currentIssue.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentIssue),
      })
        .then((response) => response.json())
        .then((data) => {
          setIssues(
            issues.map((issue) => (issue.id === data.id ? data : issue))
          );
          setIsModalOpen(false);
          setCurrentIssue(null);
        })
        .catch((error) => console.error("Error updating issue:", error));
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setIssues(issues.filter((issue) => issue.id !== id)))
      .catch((error) => console.error("Error deleting issue:", error));
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
