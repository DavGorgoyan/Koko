import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const config = {
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    host: process.env.DB_HOST
};

const db = mysql.createPool(config);

export default db;