# Lab 02 – SQLite and Relational Database Operations

## Student Details
- Name: Sai Keerthan
- Registration Number: 252U1R1044
- Section: CSE-2A

## Project Description
This project implements a Book Management REST API using Node.js, Express.js and SQLite.

The application supports CRUD operations to manage book records.

## Technologies Used
- Node.js
- Express.js
- SQLite
- SQLite3
- Postman

## Installation

```bash
npm install
```

## Run Application

```bash
npm run dev
```

Server URL: http://localhost:3000/

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get one book |
| POST | /books/ | Add a book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

## Database
Database: SQLite

Table: book

Columns: id, title, author, price, pages.

## Screenshots
Postman API testing screenshots are stored in the screenshots folder.

## Deployment
The application currently runs locally and has not been deployed.