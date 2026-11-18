
const connectDB = require("./db");

async function createDatabase() {
    try {
        const db = await connectDB();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `);

        console.log("Users table created successfully!");

        await db.close();

    } catch (error) {
        console.error("Database initialization failed:", error.message);
        process.exitCode = 1;
    }
}

createDatabase();
