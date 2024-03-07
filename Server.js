const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Prisijungimo prie SQLite duomenų bazės
const db = new sqlite3.Database('identifier.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});


app.use(bodyParser.json());


app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM ismanieji_namai';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(rows);
  });
});

app.post('/api/data', (req, res) => {
  const { column1, column2 } = req.body;
  const sql = `INSERT INTO ismanieji_namai (column1, column2) VALUES (?, ?)`;
  db.run(sql, [column1, column2], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
      return;
    }
    res.send('Data inserted successfully');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});