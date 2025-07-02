import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',      // DB 주소
  user: 'root',           // DB 사용자
  password: '비밀번호',   // DB 비밀번호
  database: '데이터베이스명', // DB 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;