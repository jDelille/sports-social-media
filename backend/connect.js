import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

// Optional: Export a function to close the connection gracefully
export const closeConnection = () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing the connection:', err);
            return;
        }
        console.log('Database connection closed.');
    });
};