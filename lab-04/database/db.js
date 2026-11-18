
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "users.db");

async function connectDB() {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log("Database connected successfully!");

    return db;
}

module.exports = connectDB;
