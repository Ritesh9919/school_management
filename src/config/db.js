import dotenv from "dotenv";
dotenv.config();
import mysql12 from "mysql2";

const PASSWORD = process.env.PASSWORD;

const pool = mysql12.createPool({
  host: "localhost",
  user: "root",
  password: PASSWORD,
  database: "school_management",
});

const promisePool = pool.promise();

async function testConnection() {
  try {
    await promisePool.query("SELECT 1");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Run the connection test
testConnection();

export default promisePool;
