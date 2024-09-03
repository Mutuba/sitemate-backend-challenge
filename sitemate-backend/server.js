// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());

// let issues = [
//   { id: 1, title: "Issue 1", description: "Description for issue 1" },
//   { id: 2, title: "Issue 2", description: "Description for issue 2" },
//   { id: 3, title: "Issue 3", description: "Description for issue 3" },
// ];

// app.post("/issues", (req, res) => {
//   const newIssue = req.body;
//   issues.push(newIssue);
//   console.log("Issue Created:", newIssue);
//   res.json(newIssue);
// });

// app.get("/issues", (req, res) => {
//   res.json(issues);
// });

// app.put("/issues/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedIssue = req.body;
//   issues = issues.map((issue) => (issue.id === id ? updatedIssue : issue));
//   console.log("Issue Updated:", updatedIssue);
//   res.json(updatedIssue);
// });

// app.delete("/issues/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   issues = issues.filter((issue) => issue.id !== id);
//   console.log("Issue Deleted:", id);
//   res.json({ message: `Issue ${id} deleted` });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/issues", issueRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
