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

const DELETE_SERVICE_AREAS_DATA = `
    DELETE FROM ServiceAreas;
`;

const CREATE_TABLE_SERVICE_AREAS = `
    CREATE TABLE IF NOT EXISTS ServiceAreas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value TEXT NOT NULL,
        longDescription TEXT,
        shortDescription TEXT
    );
`;

const CREATE_TABLE_FUNCTIONALITIES = `
    CREATE TABLE IF NOT EXISTS Functionalities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        "group" TEXT NOT NULL,
        value TEXT NOT NULL,
        longDescription TEXT,
        shortDescription TEXT,
        serviceAreaId INTEGER,
        FOREIGN KEY (serviceAreaId) REFERENCES ServiceAreas(id)
    );
`;

const INSERT_SERVICE_AREAS_DATA = `
  INSERT INTO ServiceAreas (name, value, longDescription, shortDescription) VALUES 
  ('Lighting', 'lighting', '', ''),
  ('Security', 'security', '', ''),
  ('Weather', 'weather', '', '');
`;

const INSERT_FUNCTIONALITIES_DATA = `
  INSERT INTO Functionalities (name, "group", value, longDescription, shortDescription, serviceAreaId) VALUES 
  ('Switching', 'lighting', 'switching', '', '', 1),
  ('Colour', 'lighting', 'colour', '', '', 1),
  ('Sequences', 'lighting', 'sequences', '', '', 1),
  ('Storm/Rain Satellite Unit', 'security', 'storm-rain-satellite-unit', '', '', 2),
  ('Storm/Rain Universal Transmitter', 'security', 'storm-rain-universal-transmitter', '', '', 2),
  ('Storm/Rain', 'security', 'storm-rain', '', '', 2),
  ('Leakage', 'security', 'leakage', '', '', 2),
  ('Weather forecast', 'weather', 'weather-forecast', '', '', 3),
  ('Weather station', 'weather', 'weather-station', '', '', 3),
  ('Creation of rules', 'weather', 'creation-of-rules', '', '', 3);
`;


const db = SQLite.openDatabase('test1.db', '1.0', '', 1, null, null, null, () => { db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys enabled')); });

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

export function createSystemsTable() {
  return executeSql(CREATE_TABLE_SYSTEMS);
}

export function createServiceAreasTable() {
    return executeSql(CREATE_TABLE_SERVICE_AREAS);
}

export function createFunctionalitiesTable() {
    return executeSql(CREATE_TABLE_FUNCTIONALITIES);
}

export function insertSystemsData() {
  return executeSql(INSERT_SYSTEMS_DATA);
}


export function insertServiceAreasData() {
    return executeSql(INSERT_SERVICE_AREAS_DATA);
}

export function insertFunctionalitiesData() {
    return executeSql(INSERT_FUNCTIONALITIES_DATA);
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

export async function getServiceAreasData() {
    try {
        const serviceAreasQuery = await executeSql("SELECT name, value, longDescription, shortDescription FROM ServiceAreas");
        const serviceAreasData = await Promise.all(serviceAreasQuery.rows._array.map(async area => {
            console.log("Fetching service area:", area.name);
            const functionalitiesQuery = await executeSql("SELECT name, `group`, value, longDescription, shortDescription FROM Functionalities WHERE `group` = ?", [area.value]);
            const functionalitiesData = functionalitiesQuery.rows._array.map(functionality => ({
                name: functionality.name,
                value: functionality.value,
                longDescription: functionality.longDescription,
                shortDescription: functionality.shortDescription
            }));
            console.log("Functionalities - " + JSON.stringify(functionalitiesData));
            return {
                name: area.name,
                value: area.value,
                longDescription: area.longDescription,
                shortDescription: area.shortDescription,
                functionalities: functionalitiesData
            };
        }));
        console.log(serviceAreasData);
        return serviceAreasData;
    } catch (error) {
        throw error;
    }
}

  
  
  
  
  export async function getFunctionalitiesData() {
    try {
        const functionalitiesQuery = await executeSql("SELECT name, `group`, value, longDescription, shortDescription FROM Functionalities WHERE `group` = ?", ["lighting"]);
        const functionalitiesData = await Promise.all(functionalitiesQuery.rows._array.map(async functionality => {
            console.log("Functionality name:", functionality.name);
            return {
                name: functionality.name,
                value: functionality.value,
                longDescription: functionality.longDescription,
                shortDescription: functionality.shortDescription,
            };
        }));
    } catch (error) {
      throw error;
    }
  }
  
  

export function deleteAllSystemsData() {
    return executeSql(DELETE_SYSTEMS_DATA);
}

export function deleteAllServiceAreasData() {
    return executeSql(DELETE_SERVICE_AREAS_DATA);
}