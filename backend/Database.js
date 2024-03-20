import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { executeSql } from "./ExecuteSQL";
import {
  dropFunctionalitiesTable,
  createFunctionalitiesTable,
  addFunctionalities,
} from "./Functionalities/Functions";
import {
  dropSystemsFunctionalitiesTable,
  createSystemsFunctionalitiesTable,
  addSystemsFunctionalities,
} from "./SystemsFunctionalities/Functions";
import {
  dropSystemsTable,
  createSystemsTable,
  addSystems,
} from "./Systems/Functions";
import {
  dropServiceAreasTable,
  createServiceAreasTable,
  addServiceAreas,
} from "./ServiceAreas/Functions";

// const INSERT_SYSTEMS_DATA = `
//   INSERT INTO Systems (name, link, description) VALUES
//   ('LB MANAGEMENT', 'http://system1', ''),
//   ('eNet SMART HOME', 'http://system2', ''),
//   ('KNX SMART VISU SERVER', 'http://system3', ''),
//   ('KNX VISU PRO SERVER', 'http://system4', '');
// `;

// const INSERT_SERVICE_AREAS_DATA = `
//   INSERT INTO ServiceAreas (name, value, longDescription, shortDescription) VALUES
//   ('Lighting', 'lighting', '', ''),
//   ('Security', 'security', '', ''),
//   ('Weather', 'weather', '', '');
// `;

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
      "SELECT name, `group`, longDescription, shortDescription FROM ServiceAreas"
    );
    const serviceAreasData = await Promise.all(
      serviceAreasQuery.rows._array.map(async (area) => {
        //console.log("Fetching service area:", area.name);
        const functionalitiesQuery = await executeSql(
          "SELECT name, `group`, value, longDescription, shortDescription FROM Functionalities WHERE `group` = ?",
          [area.group]
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
          group: area.group,
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

export const getTableNames = async (db) => {
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

/////////////////////////////////////////////////////

export async function getSystemsData() {
  try {
    // Fetch systems data from the Systems table
    const systemsQuery = await executeSql(
      "SELECT name, link, description FROM Systems"
    );
    const systemsData = systemsQuery.rows._array;

    // Initialize an array to store the final systems data
    const finalSystemsData = [];

    // Iterate over each system to fetch associated functionalities
    for (const system of systemsData) {
      // Initialize an array to store service areas
      const serviceAreas = [];

      // Fetch functionalities associated with the current system
      const functionalitiesQuery = await executeSql(
        "SELECT functionalityValue FROM SystemsFunctionalities WHERE systemName = ?",
        [system.name]
      );
      const functionalitiesData = functionalitiesQuery.rows._array;

      // Iterate over each functionality to fetch its group information
      for (const functionality of functionalitiesData) {
        // Fetch group information from the Functionalities table
        const groupQuery = await executeSql(
          "SELECT `group` FROM Functionalities WHERE value = ?",
          [functionality.functionalityValue]
        );
        const group = groupQuery.rows._array[0].group;

        // Check if a service area with the same group already exists in the serviceAreas array
        const existingServiceArea = serviceAreas.find(
          (area) => area.name === group
        );

        // If the service area doesn't exist, create a new one
        if (!existingServiceArea) {
          serviceAreas.push({
            name: group,
            functionalities: [functionality.functionalityValue],
          });
        } else {
          // If the service area already exists, add the functionality to its functionalities array
          existingServiceArea.functionalities.push(
            functionality.functionalityValue
          );
        }
      }

      // Add the system data with service areas to the final array
      finalSystemsData.push({
        name: system.name,
        link: system.link,
        description: system.description,
        serviceAreas: serviceAreas,
      });
    }

    return finalSystemsData;
  } catch (error) {
    throw error;
  }
}

/////////////////////////

export async function dropAllTables() {
  dropFunctionalitiesTable();
  dropSystemsFunctionalitiesTable();
  dropSystemsTable();
  dropServiceAreasTable();
}

export async function createAllTables() {
  createFunctionalitiesTable();
  createSystemsFunctionalitiesTable();
  createSystemsTable();
  createServiceAreasTable();
}

export async function insertDataToAllTables() {
  addFunctionalities();
  addServiceAreas();
  addSystems();
  addSystemsFunctionalities();
}
