## Issue Tracker

### Technology Choices

### Frontend: React

- Used for building the user interface with a component-based architecture.
- Backend: Node.js (Express)
- Serves as a simple backend API to handle CRUD operations.
- Data Storage: In-memory (for simplicity)
- Issues are stored in memory for the duration of the server's runtime.

### API Design

- The API provides endpoints to perform CRUD operations on issues. Each issue has the following properties:

- id (number): Unique identifier for the issue.
- title (string): The title of the issue.
- description (string): A detailed description of the issue.

### Endpoints

1.  GET /issues

- Description: Fetch all issues.
- Response: An array of issue objects.

2.  POST /issues

- Description: Create a new issue.

- Request Body:

```json
{
  "id": 1,
  "title": "Issue Title",
  "description": "Issue Description"
}
```

- Response: The created issue object.

3. PUT /issues/

- Description: Update an existing issue by ID.

- Request Body:

```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated Description"
}
```

- Response: The updated issue object.

4. DELETE /issues/

- Description: Delete an issue by ID.
- Response: No content (status 204).
- Demonstration of Each Operation
- Fetch Issues:

- On page load, the App component fetches and displays all issues from the API.

##### Create an Issue:

- Enter a title and description in the form fields and click the "Create" button.
- The form fields will be cleared upon successful creation.

##### Update an Issue:

- Click the "Update" button next to an issue.
- The issue will be updated with a new title and description.

##### Delete an Issue:

- Click the "Delete" button next to an issue.
- The issue will be removed from the list.

### Improvements

#### Data Persistence:

- Currently, the backend uses in-memory storage. For a production-ready application, consider integrating a database (e.g., MongoDB, PostgreSQL) for persistent storage.

#### Error Handling:

- Enhance error handling and user feedback for operations (e.g., showing error messages in the UI).

#### Form Validation:

- Add form validation to ensure that required fields are filled out correctly before submission.

#### API Rate Limiting:

- Implement rate limiting to prevent abuse of the API.

#### User Authentication:

- Implement user authentication and authorization to secure API endpoints and manage user-specific data.

#### Enhanced UI/UX:

- Improve the user interface with better styling and user experience enhancements.

#### Testing:

- Add comprehensive unit and integration tests for both frontend and backend to ensure stability and reliability.
