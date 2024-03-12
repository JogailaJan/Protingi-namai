import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";

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

const db = SQLite.openDatabase(
  "test1.db",
  "1.0",
  "",
  1,
  null,
  null,
  null,
  () => {
    db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys enabled")
    );
  }
);

export function executeSql(sqlStatement, argument) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
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
    const serviceAreasQuery = await executeSql(
      "SELECT name, value, longDescription, shortDescription FROM ServiceAreas"
    );
    const serviceAreasData = await Promise.all(
      serviceAreasQuery.rows._array.map(async (area) => {
        //console.log("Fetching service area:", area.name);
        const functionalitiesQuery = await executeSql(
          "SELECT name, `group`, value, longDescription, shortDescription FROM Functionalities WHERE `group` = ?",
          [area.value]
        );
        const functionalitiesData = functionalitiesQuery.rows._array.map(
          (functionality) => ({
            name: functionality.name,
            group: functionality.group,
            value: functionality.value,
            longDescription: functionality.longDescription,
            shortDescription: functionality.shortDescription,
          })
        );
        //console.log("Functionalities - " + JSON.stringify(functionalitiesData));
        return {
          name: area.name,
          value: area.value,
          longDescription: area.longDescription,
          shortDescription: area.shortDescription,
          functionalities: functionalitiesData,
        };
      })
    );
    //console.log(serviceAreasData);
    return serviceAreasData;
  } catch (error) {
    throw error;
  }
}

// export async function getFunctionalitiesData() {
//   try {
//       const functionalitiesQuery = await executeSql("SELECT name, `group`, value, longDescription, shortDescription FROM Functionalities WHERE `group` = ?", ["lighting"]);
//       const functionalitiesData = await Promise.all(functionalitiesQuery.rows._array.map(async functionality => {
//           console.log("Functionality name:", functionality.name);
//           return {
//               name: functionality.name,
//               value: functionality.value,
//               longDescription: functionality.longDescription,
//               shortDescription: functionality.shortDescription,
//           };
//       }));
//   } catch (error) {
//     throw error;
//   }
// }

export function deleteAllSystemsData() {
  return executeSql(DELETE_SYSTEMS_DATA);
}

export function deleteAllServiceAreasData() {
  return executeSql(DELETE_SERVICE_AREAS_DATA);
}

const addServiceAreasToDatabase = async (serviceAreas) => {
  try {
    for (const serviceArea of serviceAreas) {
      // Check if the service area already exists in the database
      const existingServiceAreaQuery = await executeSql(
        "SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?",
        [serviceArea.name]
      );
      const existingServiceAreaCount =
        existingServiceAreaQuery.rows._array[0].count;
      if (existingServiceAreaCount === 0) {
        // If the service area doesn't exist, insert it into the database
        const insertQuery =
          "INSERT INTO ServiceAreas (name, value, longDescription, shortDescription) VALUES (?, ?, ?, ?)";
        await executeSql(insertQuery, [
          serviceArea.name,
          serviceArea.value,
          serviceArea.longDescription,
          serviceArea.shortDescription,
        ]);
        console.log("Service area added to the database:", serviceArea.name);
      } else {
        console.log(
          "Service area already exists in the database:",
          serviceArea.name
        );
      }
    }
  } catch (error) {
    console.error("Error adding service areas to the database:", error);
  }
};

// Example usage:
const serviceAreasToAdd = [
  {
    name: "Heating",
    value: "heating",
    longDescription: "Description of the new service area 2",
    shortDescription: "Short description 2",
  },
  {
    name: "Service Area 3",
    value: "value 2",
    longDescription: "Description of the new service area 2",
    shortDescription: "Short description 2",
  },
];

addServiceAreasToDatabase(serviceAreasToAdd);

// Function to delete selected service areas from the database
const deleteServiceAreasFromDatabase = async (serviceAreaNames) => {
  try {
    for (const name of serviceAreaNames) {
      // Check if the service area exists in the database
      const existsQuery =
        "SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?";
      const result = await executeSql(existsQuery, [name]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        console.log(
          `Service area '${name}' does not exist in the database. Skipping deletion.`
        );
        continue; // Skip to the next iteration
      }

      // Delete the service area from the database
      const deleteQuery = "DELETE FROM ServiceAreas WHERE name = ?";
      await executeSql(deleteQuery, [name]);
      console.log("Service area deleted from the database:", name);
    }
  } catch (error) {
    console.error("Error deleting service areas from the database:", error);
  }
};

// Example usage:
const serviceAreasToDelete = [
  "Service Area 1",
  "New Service Area 2",
  "Nonexistent Service Area",
];

//deleteServiceAreasFromDatabase(serviceAreasToDelete);

// Function to update selected service areas in the database
const updateServiceAreasInDatabase = async (serviceAreasToUpdate) => {
  try {
    for (const area of serviceAreasToUpdate) {
      // Check if the service area exists in the database
      const existsQuery =
        "SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?";
      const result = await executeSql(existsQuery, [area.name]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        console.log(
          `Service area '${area.name}' does not exist in the database. Skipping update.`
        );
        continue; // Skip to the next iteration
      }

      // Update the service area in the database
      const updateQuery =
        "UPDATE ServiceAreas SET value = ?, longDescription = ?, shortDescription = ? WHERE name = ?";
      await executeSql(updateQuery, [
        area.value,
        area.longDescription,
        area.shortDescription,
        area.name,
      ]);
      console.log("Service area updated in the database:", area.name);
    }
  } catch (error) {
    console.error("Error updating service areas in the database:", error);
  }
};

// Example usage:
const serviceAreasToUpdate = [
  {
    name: "Service Area 1",
    value: "value 1",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
  {
    name: "Service Area 2",
    value: "updated value",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
  {
    name: "Nonexistent Service Area",
    value: "updated value",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
];

//updateServiceAreasInDatabase(serviceAreasToUpdate);

// Function to add functionalities to the database
const addFunctionalitiesToDatabase = async (functionalities) => {
  try {
    for (const functionality of functionalities) {
      // Check if the functionality already exists in the database
      const existingFunctionalityQuery = await executeSql(
        "SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?",
        [functionality.name]
      );
      const existingFunctionalityCount =
        existingFunctionalityQuery.rows._array[0].count;
      if (existingFunctionalityCount === 0) {
        // If the functionality doesn't exist, insert it into the database
        const insertQuery =
          "INSERT INTO Functionalities (name, `group`, value, longDescription, shortDescription) VALUES (?, ?, ?, ?, ?)";
        await executeSql(insertQuery, [
          functionality.name,
          functionality.group,
          functionality.value,
          functionality.longDescription,
          functionality.shortDescription,
        ]);
        console.log("Functionality added to the database:", functionality.name);
      } else {
        console.log(
          "Functionality already exists in the database:",
          functionality.name
        );
      }
    }
  } catch (error) {
    console.error("Error adding functionalities to the database:", error);
  }
};

// Example usage:
const functionalitiesToAdd = [
  {
    name: "Programmable thermostat",
    group: "heating",
    value: "new-value-1",
    longDescription: "Description of the new functionality 1",
    shortDescription: "Short description 1",
  },
];

addFunctionalitiesToDatabase(functionalitiesToAdd);

// Function to delete selected functionalities from the database
const deleteFunctionalitiesFromDatabase = async (functionalityNames) => {
  try {
    for (const name of functionalityNames) {
      // Check if the functionality exists in the database
      const existsQuery =
        "SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?";
      const result = await executeSql(existsQuery, [name]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        console.log(
          `Functionality '${name}' does not exist in the database. Skipping deletion.`
        );
        continue; // Skip to the next iteration
      }

      // Delete the functionality from the database
      const deleteQuery = "DELETE FROM Functionalities WHERE name = ?";
      await executeSql(deleteQuery, [name]);
      console.log("Functionality deleted from the database:", name);
    }
  } catch (error) {
    console.error("Error deleting functionalities from the database:", error);
  }
};

const functionalitiesToDelete = [
  "Functionality 1",
  "New Functionality 2",
  "Nonexistent Functionality",
];

// deleteFunctionalitiesFromDatabase(functionalitiesToDelete);

// Function to update selected functionalities in the database
const updateFunctionalitiesInDatabase = async (functionalitiesToUpdate) => {
  try {
    for (const functionality of functionalitiesToUpdate) {
      // Check if the functionality exists in the database
      const existsQuery =
        "SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?";
      const result = await executeSql(existsQuery, [functionality.name]);
      const count = result.rows.item(0).count;

      if (count === 0) {
        console.log(
          `Functionality '${functionality.name}' does not exist in the database. Skipping update.`
        );
        continue; // Skip to the next iteration
      }

      // Update the functionality in the database
      const updateQuery =
        "UPDATE Functionalities SET `group` = ?, value = ?, longDescription = ?, shortDescription = ? WHERE name = ?";
      await executeSql(updateQuery, [
        functionality.group,
        functionality.value,
        functionality.longDescription,
        functionality.shortDescription,
        functionality.name,
      ]);
      console.log("Functionality updated in the database:", functionality.name);
    }
  } catch (error) {
    console.error("Error updating functionalities in the database:", error);
  }
};

const functionalitiesToUpdate = [
  {
    name: "Functionality 1",
    group: "updated group",
    value: "updated value",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
  {
    name: "Functionality 2",
    group: "updated group",
    value: "updated value",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
  {
    name: "Nonexistent Functionality",
    group: "updated group",
    value: "updated value",
    longDescription: "updated long description",
    shortDescription: "updated short description",
  },
];

// updateFunctionalitiesInDatabase(functionalitiesToUpdate);

export const getTableNames = async () => {
  try {
    const query = "SELECT name FROM sqlite_master WHERE type='table'";
    const result = await executeSql(query, []);
    const tableNames = result.rows._array.map((row) => row.name);
    console.log("Table names:", tableNames);
    console.log("Number of tables:", tableNames.length);
    return tableNames;
  } catch (error) {
    console.error("Error retrieving table names:", error);
    return [];
  }
};

export async function checkIfTablesExist() {
  try {
    // Query to check if there are any tables in the database, excluding sqlite_sequence
    const query =
      "SELECT count(*) AS tableCount FROM sqlite_master WHERE type='table' AND name <> 'sqlite_sequence';";

    // Execute the query
    const result = await executeSql(query);

    // Get the number of tables
    const tableCount = result.rows.item(0).tableCount;

    // Return true if there are tables (excluding sqlite_sequence), false otherwise
    return tableCount > 0;
  } catch (error) {
    console.error("Error checking if tables exist:", error);
    throw error;
  }
}
