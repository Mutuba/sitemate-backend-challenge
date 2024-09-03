import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { mockFetch } from "./fetchMocks";

describe("App Component Tests", () => {
  beforeEach(() => {
    mockFetch();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders Issues heading", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Issues/i)).toBeInTheDocument();
    });
  });

  test("renders existing issues", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Test Issue 1/)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Test Issue 2/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Description 1/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Description 2/)).toBeInTheDocument();
    });
  });

  test("renders create new issue inputs and button", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Create/i })
      ).toBeInTheDocument();
    });
  });

  test("creates a new issue", async () => {
    render(<App />);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const createButton = screen.getByRole("button", { name: /Create/i });

    fireEvent.change(titleInput, { target: { value: "Test Issue" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText(/Test Issue/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    });
  });

  // because of time constraints i could not add test for update and delete

  test("updates an issue", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Test Issue 1/)).toBeInTheDocument();
    });
    const updateButton = screen.getAllByRole("button", { name: /Update/i })[0];
    fireEvent.click(updateButton);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);

    fireEvent.change(titleInput, { target: { value: "Updated Test Issue 1" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Test Description 1" },
    });

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Updated Test Issue 1/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Updated Test Description 1/i)
      ).toBeInTheDocument();
    });
  });

  test("deletes an issue", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getAllByRole("button", { name: /Delete/i })[0]
      ).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByRole("button", { name: /Delete/i })[0];

    fireEvent.click(deleteButton);

    await waitFor(() => {
      const deletedIssue = screen.queryByText(/Test Issue 1/i);
      expect(deletedIssue).not.toBeInTheDocument();
    });
  });
});
