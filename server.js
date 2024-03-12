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

// Nustatykime bodyParser middleware, kad galėtume apdoroti JSON užklausas
app.use(bodyParser.json());

// Pavyzdinis GET route, gauti duomenis iš duomenų bazės
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

// Pavyzdinis POST route, įterpti duomenis į duomenų bazę
app.post('/api/data', (req, res) => {
  const { column1, column2 } = req.body; // Gauti duomenis iš užklausos kūno
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

// Paleiskime serverį
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
