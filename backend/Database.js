import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

const CREATE_TABLE_SYSTEMS = `
  CREATE TABLE IF NOT EXISTS Systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT
  );
`;

const INSERT_SYSTEMS_DATA = `
  INSERT INTO Systems (name, link, description) VALUES 
  ('LB MANAGEMENT', 'http://system1', ''),
  ('eNet SMART HOME', 'http://system2', ''),
  ('KNX SMART VISU SERVER', 'http://system3', ''),
  ('KNX VISU PRO SERVER', 'http://system4', '');
`;


const DELETE_SYSTEMS_DATA = `
    DELETE FROM Systems;
`;

const db = SQLite.openDatabase('test1.db');

export function executeSql(sqlStatement) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sqlStatement,
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
}

export function createSystemsTable() {
  return executeSql(CREATE_TABLE_SYSTEMS);
}

export function insertSystemsData() {
  return executeSql(INSERT_SYSTEMS_DATA);
}

export function fetchSystemsData() {
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { rows } = await executeSql("SELECT * FROM Systems");
        const systemsData = rows._array;
        setSystems(systemsData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { systems, isLoading, error };
}

export function deleteAllSystemsData() {
    return executeSql(DELETE_SYSTEMS_DATA);
}
