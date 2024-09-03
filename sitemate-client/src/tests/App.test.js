import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App Component Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      if (url === "http://localhost:3001/issues" && !options) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                title: "Test Issue 1",
                description: "Test Description 1",
              },
              {
                id: 2,
                title: "Test Issue 2",
                description: "Test Description 2",
              },
            ]),
        });
      }

      if (url === "http://localhost:3001/issues" && options.method === "POST") {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 3,
              title: "Test Issue",
              description: "Test Description",
            }),
        });
      }

      if (
        url.startsWith("http://localhost:3001/issues/") &&
        options.method === "PUT"
      ) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: parseInt(url.split("/").pop(), 10),
              title: `Updated ${url.split("/").pop()}`,
              description: `Updated description ${url.split("/").pop()}`,
            }),
        });
      }

      if (url.startsWith("http://localhost:3001/issues/")) {
        const id = parseInt(url.split("/").pop(), 10);
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id,
              title: `Test Issue ${id}`,
              description: `Test Description ${id}`,
            }),
        });
      }

      return Promise.reject(new Error("Unknown URL"));
    });
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
});
