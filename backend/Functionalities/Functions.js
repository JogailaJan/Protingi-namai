import { executeSql } from '../ExecuteSQL';
import { functionalitiesToAdd } from "./Add";
import { functionalitiesToDelete } from "./Delete";
import { functionalitiesToUpdate } from "./Update";

const CREATE_TABLE_FUNCTIONALITIES = `
    CREATE TABLE IF NOT EXISTS Functionalities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        "group" TEXT NOT NULL,
        value TEXT NOT NULL,
        longDescription TEXT,
        shortDescription TEXT,
        serviceAreaId INTEGER
    );
`;

const DROP_TABLE_FUNCTIONALITIES =`
  DROP TABLE IF EXISTS Functionalities;
`;
//        FOREIGN KEY (serviceAreaId) REFERENCES ServiceAreas(id)

const DELETE_FUNCTIONALITIES_DATA = `
    DELETE FROM Functionalities;
`;

export async function createFunctionalitiesTable() {
    console.log("Executing CREATE_TABLE_FUNCTIONALITIES...");
    return executeSql(CREATE_TABLE_FUNCTIONALITIES)
        .then(() => {
            console.log("CREATE_TABLE_FUNCTIONALITIES executed successfully.");
        })
        .catch(error => {
            console.error("Error executing CREATE_TABLE_FUNCTIONALITIES:", error);
        });
}

export async function dropFunctionalitiesTable(){
    return executeSql(DROP_TABLE_FUNCTIONALITIES);
}

// Function to add functionalities to the database
const addFunctionalitiesToDatabase = async (functionalities) => {
    try {
      for (const functionality of functionalities) {
        // Check if the functionality already exists in the database
        const existingFunctionalityQuery = await executeSql("SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?", [functionality.name]);
        const existingFunctionalityCount = existingFunctionalityQuery.rows._array[0].count;
        if (existingFunctionalityCount === 0) {
          // If the functionality doesn't exist, insert it into the database
          const insertQuery = "INSERT INTO Functionalities (name, `group`, value, longDescription, shortDescription) VALUES (?, ?, ?, ?, ?)";
          await executeSql(insertQuery, [functionality.name, functionality.group, functionality.value, functionality.longDescription, functionality.shortDescription]);
          console.log('Functionality added to the database:', functionality.name);
        } else {
          console.log('Functionality already exists in the database:', functionality.name);
        }
      }
    } catch (error) {
      console.error('Error adding functionalities to the database:', error);
    }
};

export const addFunctionalities = async () => {
  addFunctionalitiesToDatabase(functionalitiesToAdd);
};

// Function to delete selected functionalities from the database
const deleteFunctionalitiesFromDatabase = async (functionalityNames) => {
    try {
      for (const name of functionalityNames) {
        // Check if the functionality exists in the database
        const existsQuery = "SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?";
        const result = await executeSql(existsQuery, [name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`Functionality '${name}' does not exist in the database. Skipping deletion.`);
          continue; // Skip to the next iteration
        }
  
        // Delete the functionality from the database
        const deleteQuery = "DELETE FROM Functionalities WHERE name = ?";
        await executeSql(deleteQuery, [name]);
        console.log('Functionality deleted from the database:', name);
      }
    } catch (error) {
      console.error('Error deleting functionalities from the database:', error);
    }
};
  
//deleteFunctionalitiesFromDatabase(functionalitiesToDelete);

// Function to update selected functionalities in the database
const updateFunctionalitiesInDatabase = async (functionalitiesToUpdate) => {
    try {
      for (const functionality of functionalitiesToUpdate) {
        // Check if the functionality exists in the database
        const existsQuery = "SELECT COUNT(*) AS count FROM Functionalities WHERE name = ?";
        const result = await executeSql(existsQuery, [functionality.name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`Functionality '${functionality.name}' does not exist in the database. Skipping update.`);
          continue; // Skip to the next iteration
        }
  
        // Update the functionality in the database
        const updateQuery = "UPDATE Functionalities SET `group` = ?, value = ?, longDescription = ?, shortDescription = ? WHERE name = ?";
        await executeSql(updateQuery, [functionality.group, functionality.value, functionality.longDescription, functionality.shortDescription, functionality.name]);
        console.log('Functionality updated in the database:', functionality.name);
      }
    } catch (error) {
      console.error('Error updating functionalities in the database:', error);
    }
};

//updateFunctionalitiesInDatabase(functionalitiesToUpdate);