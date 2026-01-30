import mysql from 'mysql2/promise'; // <-- IMPORTANT : ajoute /promise
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

console.log("✅ Connecté à MySQL via Promises");

export default connection;