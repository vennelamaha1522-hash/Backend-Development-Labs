# Lab 3: REST API, Query Parameters, Validation and Debugging

## Student Details

- **Name:** Mahalaxmi Vennela
- **Roll Number:** 252U1R1257
- **Section:** CSE-2E
- **Term:** II
- **Subject:** Backend Development Fundamentals

## Aim

To develop REST API endpoints using Node.js, Express.js and SQLite. Implement query parameters, searching, sorting, pagination, price filtering, input validation and error handling.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Render (Cloud Deployment)
- GitHub (Version Control)

## Project Structure

```text
LAB-03/
│
├── database/
│   └── books.db
│
├── screenshots/
│
├── .env.example
├── .gitignore
├── check-db.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vennelamaha1522-hash/Backend-Development-Labs.git
```

2. Navigate to the Lab 3 folder:

```bash
cd Backend-Development-Labs/LAB-03/lab-03
```

3. Install dependencies:

```bash
npm install
```

## Run the Application Locally

Start the development server:

```bash
npm run dev
```

Server URL:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Query Parameters

- `search_q` – Search books by title.
- `order_by` – Sort records by column.
- `order` – Sort in ascending or descending order.
- `limit` – Specify the number of records.
- `offset` – Specify the starting record.
- `min_price` – Filter books by minimum price.
- `max_price` – Filter books by maximum price.

### Example Requests

Get all books:

```text
GET /books
```

Search books:

```text
GET /books?search_q=python
```

Sort books:

```text
GET /books?order_by=price&order=ASC
```

Pagination:

```text
GET /books?limit=5&offset=0
```

Filter by price:

```text
GET /books?min_price=100&max_price=500
```

## Validation and Error Handling

The application implements request validation and appropriate HTTP status codes.

| Status Code | Description |
|---|---|
| 200 | Successful retrieval, update or deletion |
| 201 | Book created successfully |
| 400 | Invalid input or request |
| 404 | Book or endpoint not found |
| 500 | Internal server error |

## API Testing

All API endpoints were tested using Postman.

Testing includes:

- Retrieving all books.
- Retrieving a book by ID.
- Adding new books.
- Updating existing books.
- Deleting books.
- Searching and sorting records.
- Testing pagination and price filters.
- Checking invalid inputs and error responses.

## Database

SQLite is used to store book records.

Database file:

```text
database/books.db
```

The database contains the book records used by the REST API.

## Deployment on Render

The project is being configured for deployment using Render.

**Deployment Configuration:**

| Setting | Value |
|---|---|
| Platform | Render |
| Service Type | Web Service |
| Runtime | Node.js |
| Branch | main |
| Root Directory | `LAB-03/lab-03` |
| Build Command | `npm install` |
| Start Command | `npm start` |

**Deployment Status:** Pending final verification of the Lab 3 service.

**Live API URL:** To be added after successful deployment.

After deployment, the API endpoints can be accessed using the Render service URL instead of localhost.

Example:

```text
https://YOUR-RENDER-URL.onrender.com/books/
```

## Conclusion

Successfully developed a REST API application using Node.js, Express.js and SQLite. Implemented CRUD operations, query parameters, searching, sorting, pagination, price filtering, input validation and error handling. Tested the API using Postman and prepared the application for cloud deployment using Render.

## Author

**Mahalaxmi Vennela**  
Roll Number: 252U1R1257  
Section: CSE-2E  
