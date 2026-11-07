
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const dbPath = path.join(__dirname, "database", "books.db");

let db = null;

// Connect to database and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Database Error:", error.message);
    process.exit(1);
  }
};

// Validate book ID
const isValidId = (id) =>
  Number.isInteger(Number(id)) && Number(id) > 0;

// GET all books with search, sorting, pagination and price filters
app.get("/books", async (req, res) => {
  try {
    const {
      search_q = "",
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = req.query;

    const allowedColumns = [
      "id",
      "title",
      "author",
      "price",
      "pages",
    ];

    if (!allowedColumns.includes(order_by)) {
      return res.status(400).json({
        error: "Invalid order_by column",
      });
    }

    const sortOrder = order.toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
      return res.status(400).json({
        error: "Order must be ASC or DESC",
      });
    }

    const limitValue = Number(limit);
    const offsetValue = Number(offset);

    if (
      !Number.isInteger(limitValue) ||
      limitValue < 1 ||
      limitValue > 100
    ) {
      return res.status(400).json({
        error: "Limit must be an integer between 1 and 100",
      });
    }

    if (!Number.isInteger(offsetValue) || offsetValue < 0) {
      return res.status(400).json({
        error: "Offset must be a non-negative integer",
      });
    }

    const conditions = [];
    const params = [];

    if (search_q.trim() !== "") {
      conditions.push("title LIKE ?");
      params.push(`%${search_q}%`);
    }

    if (min_price !== undefined) {
      const min = Number(min_price);

      if (!Number.isFinite(min) || min < 0) {
        return res.status(400).json({
          error: "min_price must be a non-negative number",
        });
      }

      conditions.push("price >= ?");
      params.push(min);
    }

    if (max_price !== undefined) {
      const max = Number(max_price);

      if (!Number.isFinite(max) || max < 0) {
        return res.status(400).json({
          error: "max_price must be a non-negative number",
        });
      }

      conditions.push("price <= ?");
      params.push(max);
    }

    if (
      min_price !== undefined &&
      max_price !== undefined &&
      Number(min_price) > Number(max_price)
    ) {
      return res.status(400).json({
        error: "min_price cannot be greater than max_price",
      });
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    const sql = `
      SELECT * FROM book
      ${whereClause}
      ORDER BY ${order_by} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    params.push(limitValue, offsetValue);

    const books = await db.all(sql, params);

    res.status(200).json({
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to retrieve books",
    });
  }
});

// GET a single book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Invalid book ID",
      });
    }

    const book = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(id)]
    );

    if (!book) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to retrieve book",
    });
  }
});

// POST a new book
app.post("/books", async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === ""
    ) {
      return res.status(400).json({
        error: "Title and author are required",
      });
    }

    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        error: "Price must be a valid non-negative number",
      });
    }

    if (
      pages !== undefined &&
      (!Number.isInteger(pages) || pages < 1)
    ) {
      return res.status(400).json({
        error: "Pages must be a positive integer",
      });
    }

    const result = await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
      [title.trim(), author.trim(), price, pages ?? null]
    );

    const newBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [result.lastID]
    );

    res.status(201).json({
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to add book",
    });
  }
});

// PUT - Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, pages } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Invalid book ID",
      });
    }

    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === ""
    ) {
      return res.status(400).json({
        error: "Title and author are required",
      });
    }

    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        error: "Price must be a valid non-negative number",
      });
    }

    if (
      pages !== undefined &&
      (!Number.isInteger(pages) || pages < 1)
    ) {
      return res.status(400).json({
        error: "Pages must be a positive integer",
      });
    }

    const result = await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
      [
        title.trim(),
        author.trim(),
        price,
        pages ?? null,
        Number(id),
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    const updatedBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(id)]
    );

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to update book",
    });
  }
});

// DELETE a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        error: "Invalid book ID",
      });
    }

    const result = await db.run(
      "DELETE FROM book WHERE id = ?",
      [Number(id)]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to delete book",
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

// Handle invalid JSON and other errors
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return res.status(400).json({
      error: "Invalid JSON request body",
    });
  }

  res.status(500).json({
    error: "Internal server error",
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Server URL: http://localhost:3000");
  console.log("Books API: http://localhost:3000/books");
});


initializeDBAndServer();
