// import SQLite from 'react-native-sqlite-storage';

// // Open the database
// const db = SQLite.openDatabase(
//   {
//     name: 'myDatabase.db',
//     location: 'default',
//   },
//   () => {},
//   error => {
//     console.error('Error opening database: ', error);
//   }
// );

// // Create tables if not exists
// db.transaction(tx => {
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
//   );
// });

// // Example CRUD operations
// export const addArea = (name, callback) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'INSERT INTO areas (name) VALUES (?)',
//       [name],
//       (_, { rowsAffected }) => {
//         callback(rowsAffected > 0);
//       }
//     );
//   });
// };

// export const getAreas = callback => {
//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM areas', [], (_, { rows }) => {
//       const areas = rows._array;
//       callback(areas);
//     });
//   });
// };
