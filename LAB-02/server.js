const path = require("path");
const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database", "books.db");
const PORT = process.env.PORT || 3000;

const initializeDBAndServer = async () => {
  try {
    const db = await sqlite.open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully!");

    // GET all books
    app.get("/books/", async (request, response) => {
      try {
        const books = await db.all("SELECT * FROM book");
        response.status(200).send(books);
      } catch (error) {
        response.status(500).send("Unable to get books");
      }
    });

    // GET a single book
    app.get("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const book = await db.get(
          "SELECT * FROM book WHERE id = ?",
          [bookId]
        );

        if (!book) {
          return response.status(404).send("Book not found");
        }

        response.status(200).send(book);
      } catch (error) {
        response.status(500).send("Unable to get book");
      }
    });

    // POST a new book
    app.post("/books/", async (request, response) => {
      try {
        const { title, author, price, pages } = request.body;

        if (!title || !author || price == null || pages == null) {
          return response.status(400).send("All fields are required");
        }

        const query = `
          INSERT INTO book (title, author, price, pages)
          VALUES (?, ?, ?, ?)
        `;

        const result = await db.run(query, [
          title,
          author,
          price,
          pages,
        ]);

        response.status(201).send({
          message: "Book added successfully",
          bookId: result.lastID,
        });
      } catch (error) {
        response.status(500).send("Unable to add book");
      }
    });

    // PUT update a book
    app.put("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body;

        if (!title || !author || price == null || pages == null) {
          return response.status(400).send("All fields are required");
        }

        const query = `
          UPDATE book
          SET title = ?, author = ?, price = ?, pages = ?
          WHERE id = ?
        `;

        const result = await db.run(query, [
          title,
          author,
          price,
          pages,
          bookId,
        ]);

        if (result.changes === 0) {
          return response.status(404).send("Book not found");
        }

        response.status(200).send("Book updated successfully");
      } catch (error) {
        response.status(500).send("Unable to update book");
      }
    });

    // DELETE a book
    app.delete("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const result = await db.run(
          "DELETE FROM book WHERE id = ?",
          [bookId]
        );

        if (result.changes === 0) {
          return response.status(404).send("Book not found");
        }

        response.status(200).send("Book deleted successfully");
      } catch (error) {
        response.status(500).send("Unable to delete book");
      }
    });

    // Start server after database connection
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

initializeDBAndServer();
