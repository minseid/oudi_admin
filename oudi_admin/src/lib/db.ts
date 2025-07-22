import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: 'where-db1.c3sewig4iszd.ap-northeast-2.rds.amazonaws.com',      
  user: 'root',           
  password: process.env.DB_PASS,   
  database: 'where_db', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;