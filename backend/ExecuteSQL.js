import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('test1.db', '1.0', '', 1, null, null, null, () => { db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys enabled')); });

export function executeSql(sqlStatement, argument) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          argument,
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  }