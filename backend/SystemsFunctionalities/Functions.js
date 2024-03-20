import { executeSql } from '../ExecuteSQL';
import { systemsFunctionalitiesToAdd } from "./Add";
import { systemsFunctionalitiesToDelete } from "./Delete";
import { systemsFunctionalitiesToUpdate } from "./Update";

const CREATE_TABLE_SYSTEMS_FUNCTIONALITIES = `
    CREATE TABLE IF NOT EXISTS SystemsFunctionalities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        systemName TEXT NOT NULL,
        functionalityValue TEXT NOT NULL
    );
`;

const DROP_TABLE_SYSTEMS_FUNCTIONALITIES =`
  DROP TABLE IF EXISTS SystemsFunctionalities;
`;

const DELETE_SYSTEMS_FUNCTIONALITIES_DATA = `
    DELETE FROM SystemsFunctionalities;
`;

export async function createSystemsFunctionalitiesTable() {
    console.log("Executing CREATE_TABLE_SYSTEMS_FUNCTIONALITIES...");
    return executeSql(CREATE_TABLE_SYSTEMS_FUNCTIONALITIES)
        .then(() => {
            console.log("CREATE_TABLE_SYSTEMS_FUNCTIONALITIES executed successfully.");
        })
        .catch(error => {
            console.error("Error executing CREATE_TABLE_SYSTEMS_FUNCTIONALITIES:", error);
        });
}

export async function dropSystemsFunctionalitiesTable(){
    return executeSql(DROP_TABLE_SYSTEMS_FUNCTIONALITIES);
}

const addSystemsFunctionalitiesToDatabase = async (systemsFunctionalities) => {
    try {
        for (const systemFunctionality of systemsFunctionalities) {
        // Check if the system functionality already exists in the database
        const existingFunctionalityQuery = await executeSql("SELECT COUNT(*) AS count FROM SystemsFunctionalities WHERE systemName = ? AND functionalityValue = ?", [systemFunctionality.systemName, systemFunctionality.functionalityValue]);
        const existingFunctionalityCount = existingFunctionalityQuery.rows._array[0].count;
        
        if (existingFunctionalityCount === 0) {
            const insertQuery = "INSERT INTO SystemsFunctionalities (systemName, functionalityValue) VALUES (?, ?)";
            await executeSql(insertQuery, [systemFunctionality.systemName, systemFunctionality.functionalityValue]);
            console.log('System functionality added to the database:', systemFunctionality);
        } else {
            console.log('System functionality already exists in the database:', systemFunctionality);
        }
        }
    } catch (error) {
        console.error('Error adding systems functionalities to the database:', error);
    }
};

export const addSystemsFunctionalities = async () => {
    addSystemsFunctionalitiesToDatabase(systemsFunctionalitiesToAdd);
};

const deleteSystemsFunctionalitiesFromDatabase = async (systemNames) => {
    try {
      for (const name of systemNames) {
        // Check if there are any entries for the system in the database
        const countQuery = "SELECT COUNT(*) AS count FROM SystemsFunctionalities WHERE systemName = ?";
        const result = await executeSql(countQuery, [name]);
        const count = result.rows.item(0).count;
  
        if (count === 0) {
          console.log(`No system functionality found in the database for '${name}'. Skipping deletion.`);
          continue; // Skip to the next iteration
        }
  
        // If entries exist, delete them
        const deleteQuery = "DELETE FROM SystemsFunctionalities WHERE systemName = ?";
        await executeSql(deleteQuery, [name]);
        console.log('System functionality deleted from the database for:', name);
      }
    } catch (error) {
      console.error('Error deleting systems functionalities from the database:', error);
    }
};

//deleteSystemsFunctionalitiesFromDatabase(systemsFunctionalitiesToDelete);

const updateSystemsFunctionalitiesInDatabase = async (systemsFunctionalitiesToUpdate) => {
    try {
        for (const systemFunctionality of systemsFunctionalitiesToUpdate) {
        // Check if there are any entries for the system in the database
        const countQuery = "SELECT COUNT(*) AS count FROM SystemsFunctionalities WHERE systemName = ?";
        const result = await executeSql(countQuery, [systemFunctionality.systemName]);
        const count = result.rows.item(0).count;

        if (count === 0) {
            console.log(`No system functionality found in the database for '${systemFunctionality.systemName}'. Skipping update.`);
            continue; // Skip to the next iteration
        }

        // If entries exist, update them
        const updateQuery = "UPDATE SystemsFunctionalities SET functionalityValue = ? WHERE systemName = ?";
        await executeSql(updateQuery, [systemFunctionality.functionalityValue, systemFunctionality.systemName]);
        console.log('System functionality updated in the database for:', systemFunctionality.systemName);
        }
    } catch (error) {
        console.error('Error updating systems functionalities in the database:', error);
    }
};
  
//updateSystemsFunctionalitiesInDatabase(systemsFunctionalitiesToUpdate);
