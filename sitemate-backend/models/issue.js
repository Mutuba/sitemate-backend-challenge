let issues = [
  { id: 1, title: "Issue 1", description: "Description for issue 1" },
  { id: 2, title: "Issue 2", description: "Description for issue 2" },
  { id: 3, title: "Issue 3", description: "Description for issue 3" },
];

const initialIssues = [...issues];

const getIssues = () => issues;

const createIssue = (issue) => {
  issues.push(issue);
  return issue;
};

const updateIssue = (id, updatedIssue) => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) {
    issues[index] = { ...issues[index], ...updatedIssue };
    return issues[index];
  }
  return null;
};

const deleteIssue = (id) => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) {
    issues.splice(index, 1);

    return true;
  }
  return false;
};
const resetIssues = () => {
  issues = [...initialIssues];
};

module.exports = {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  resetIssues,
};
