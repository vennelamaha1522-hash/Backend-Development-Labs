
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./database/db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// JWT secret key for local lab testing
const JWT_SECRET = process.env.JWT_SECRET || "lab4_demo_secret_key";

let db;

// Home route
app.get("/", (req, res) => {
    res.send("Lab 4 Authentication API is running!");
});

// REGISTER API
app.post("/register/", async (req, res) => {
    try {
        const { username, name, password } = req.body;

        // Validate input
        if (
            typeof username !== "string" ||
            typeof name !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !name.trim() ||
            !password
        ) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        // Check whether username already exists
        const existingUser = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username.trim()]
        );

        if (existingUser) {
            return res.status(400).send({
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.run(
            `INSERT INTO users (username, name, password)
             VALUES (?, ?, ?)`,
            [username.trim(), name.trim(), hashedPassword]
        );

        return res.status(201).send({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(400).send({
                message: "Username already exists"
            });
        }

        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

// LOGIN API
app.post("/login/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).send({
                message: "Username and password are required"
            });
        }

        // Find user
        const user = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username.trim()]
        );

        if (!user) {
            return res.status(400).send({
                message: "Invalid username"
            });
        }

        // Compare entered password with stored hash
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(400).send({
                message: "Invalid password"
            });
        }

        // Create JWT payload
        const payload = {
            username: user.username
        };

        // Generate JWT
        const jwtToken = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).send({
            jwt_token: jwtToken
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

// Start server
async function startServer() {
    try {
        db = await connectDB();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `);

       app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server Link: http://localhost:${PORT}/`);
});;

    } catch (error) {
        console.error("Unable to start server:", error.message);
        process.exit(1);
    }
}

startServer();
