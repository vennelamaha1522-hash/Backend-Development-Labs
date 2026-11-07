const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/books.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            price INTEGER,
            pages INTEGER
        )
    `);

    const books = [
        ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180],
        ["Atomic Habits", "James Clear", 350, 320],
        ["The Alchemist", "Paulo Coelho", 200, 190],
        ["Rich Dad Poor Dad", "Robert Kiyosaki", 300, 240],
        ["Harry Potter", "J.K. Rowling", 450, 400],
        ["Ikigai", "Hector Garcia", 280, 200],
        ["Deep Work", "Cal Newport", 320, 280],
        ["Think Like a Monk", "Jay Shetty", 270, 250]
    ];

    const stmt = db.prepare(
        "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)"
    );

    books.forEach((book) => stmt.run(book));

    stmt.finalize();
});

db.close(() => {
    console.log("Database created successfully!");
});