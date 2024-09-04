const API_URL = process.env.REACT_APP_API_URL;

export const mockFetch = () => {
  global.fetch = jest.fn((url, options) => {
    if (url === API_URL && (!options || options.method === "GET")) {
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

    if (url === API_URL && options?.method === "POST") {
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

    if (url.startsWith(API_URL) && options?.method === "PUT") {
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

    if (url.startsWith(API_URL) && options.method === "DELETE") {
      return Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
      });
    }

    return Promise.reject(new Error("Unknown URL"));
  });
};
