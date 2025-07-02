const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const port = 3000;
app.use(express.static(__dirname));


// Create DB connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // your Hostinger DB host
  user: process.env.DB_USER,      // your DB username
  password: process.env.DB_PASS,  // your DB password
  database: process.env.DB_NAME   // your DB name
});

// Connect
connection.connect(err => {
  if (err) {
    console.error('Error connecting to DB:', err.stack);
    return;
  }
  console.log('Connected to Hostinger DB as id', connection.threadId);
});

// Example route
app.get('api/show-activities', (req, res) => {
  connection.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      res.status(500).send('DB query failed');
    } else {
      res.send(`DB time: ${results[0].now}`);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
