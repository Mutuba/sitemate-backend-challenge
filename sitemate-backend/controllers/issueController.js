const Issue = require("../models/issue");

const getAllIssues = (req, res) => {
  const issues = Issue.getIssues();
  res.json(issues);
};

const createIssue = (req, res) => {
  const newIssue = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  };
  const createdIssue = Issue.createIssue(newIssue);
  res.status(201).json(createdIssue);
};

const updateIssue = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
  };
  const updatedIssue = Issue.updateIssue(id, updatedData);
  if (updatedIssue) {
    res.json(updatedIssue);
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
};

const deleteIssue = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const isDeleted = Issue.deleteIssue(id);
  if (isDeleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
};

module.exports = {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
};
