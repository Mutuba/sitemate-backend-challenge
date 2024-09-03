const {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");
const Issue = require("../models/issue");

describe("Issue Controller Tests", () => {
  beforeEach(() => {
    Issue.resetIssues();
  });

  test("should fetch all issues", () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    getAllIssues(req, res);

    expect(res.json).toHaveBeenCalledWith(Issue.getIssues());
  });

  test("should create a new issue", () => {
    const req = {
      body: { id: 4, title: "Issue 4", description: "Description for issue 4" },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    createIssue(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
    expect(Issue.getIssues().length).toBe(4);
  });

  test("should update an issue", () => {
    const req = {
      params: { id: 1 },
      body: { title: "Updated Title", description: "Updated Description" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    updateIssue(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Updated Title",
        description: "Updated Description",
      })
    );
  });

  test("should delete an issue", () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: jest.fn(() => res),
      end: jest.fn(),
      json: jest.fn(),
    };

    deleteIssue(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(Issue.getIssues().length).toBe(2);
  });
});
