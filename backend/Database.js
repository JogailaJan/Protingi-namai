import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
      name: 'SmartHome',
      location: 'default',
    },
    () => {},
    error => {
      console.error('Error opening database: ', error);
    }
);

//Create tables
db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS alphabet (id INTEGER PRIMARY KEY AUTOINCREMENT, letter TEXT)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.error('Error creating table: ', error);
      }
    );
  });
  
// Insert data into the alphabet table
db.transaction(tx => {
    // Example data to insert
    const data = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  
    // Loop through the data array and insert each item into the table
    data.forEach(item => {
      tx.executeSql(
        'INSERT INTO alphabet (letter) VALUES (?)',
        [item],
        () => {
          console.log(`Inserted ${item} successfully`);
        },
        error => {
          console.error(`Error inserting ${item}: `, error);
        }
      );
    });
  });

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM YourTable',
      [],
      (tx, results) => {
        // Handle query results
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          console.log('Row:', rows.item(i));
        }
      },
      error => {
        console.error('Error executing SQL: ', error);
      }
    );
  });
  
export default db;