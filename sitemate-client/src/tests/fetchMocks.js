export const mockFetch = () => {
  global.fetch = jest.fn((url, options) => {
    if (
      url === "http://localhost:3001/issues" &&
      (!options || options.method === "GET")
    ) {
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
        ok: true,
      });
    }

    if (url === "http://localhost:3001/issues" && options?.method === "POST") {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 3,
            title: "Test Issue",
            description: "Test Description",
          }),
        ok: true,
      });
    }

    if (
      url.startsWith("http://localhost:3001/issues/") &&
      options?.method === "PUT"
    ) {
      const id = parseInt(url.split("/").pop(), 10);
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id,
            title: "Updated Test Issue 1",
            description: "Updated Test Description 1",
          }),
        ok: true,
      });
    }

    if (
      url.startsWith("http://localhost:3001/issues/") &&
      options.method === "DELETE"
    ) {
      return Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
      });
    }

    return Promise.reject(new Error("Unknown URL"));
  });
};
