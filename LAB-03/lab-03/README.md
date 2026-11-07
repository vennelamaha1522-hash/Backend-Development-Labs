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
- Postman
- JavaScript

## Installation

```bash
npm install
```

## Run the Application

```bash
npm run dev
```

Server URL: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books | Get all books |
| GET | /books/:id | Get a book by ID |
| POST | /books | Add a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Query Parameters

- `search_q`: Search books by title.
- `order_by`: Sort by column.
- `order`: ASC or DESC.
- `limit`: Number of records.
- `offset`: Starting record.
- `min_price`: Minimum price.
- `max_price`: Maximum price.

## Validation and Error Handling

- HTTP 201 for successful book creation.
- HTTP 200 for successful retrieval, update and deletion.
- HTTP 400 for invalid input.
- HTTP 404 when a book or endpoint is not found.
- HTTP 500 for server errors.

## Screenshots

Postman testing screenshots are available in the `screenshots` folder.

## Deployment

This lab was tested locally using Postman at `http://localhost:3000`. No public deployment URL is available yet.