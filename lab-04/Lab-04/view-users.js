
const connectDB = require("./database/db");

async function showUsers() {
    try {
        const db = await connectDB();

        const users = await db.all(
            "SELECT id, username, name, password FROM users"
        );

        console.log("Users Table:");
        console.table(users);

        await db.close();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

showUsers();
