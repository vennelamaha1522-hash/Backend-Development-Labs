
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const checkDatabase = async () => {
  try {
    const db = await open({
      filename: "./database/books.db",
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully!");

    const tables = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );

    console.log("Tables:", tables);

    for (const table of tables) {
      const columns = await db.all(
        `PRAGMA table_info("${table.name}")`
      );

      console.log(`Columns in ${table.name}:`, columns);
    }

    await db.close();
  } catch (error) {
    console.log("Database Error:", error.message);
  }
};

checkDatabase();
