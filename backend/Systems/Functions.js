import { executeSql } from '../ExecuteSQL';
import { systemsToAdd } from "./Add";
import { systemsToDelete } from "./Delete";
import { systemsToUpdate } from "./Update";

const CREATE_TABLE_SYSTEMS = `
  CREATE TABLE IF NOT EXISTS Systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT
  );
`;

const DROP_TABLE_SYSTEMS =`
  DROP TABLE IF EXISTS Systems;
`;

const DELETE_SYSTEMS_DATA = `
    DELETE FROM Systems;
`;
export async function createSystemsTable() {  
    console.log("Executing CREATE_TABLE_SYSTEMS_FUNCTIONALITIES...");
    return executeSql(CREATE_TABLE_SYSTEMS)
        .then(() => {
            console.log("CREATE_TABLE_SYSTEMS executed successfully.");
        })
        .catch(error => {
            console.error("Error executing CREATE_TABLE_SYSTEMS:", error);
        });
}

export async function dropSystemsTable(){
    return executeSql(DROP_TABLE_SYSTEMS);
}

export function deleteAllSystemsData() {
    return executeSql(DELETE_SYSTEMS_DATA);
}

const addSystemsToDatabase = async (systems) => {
    try {
      for (const system of systems) {
        const existingSystemQuery = await executeSql("SELECT COUNT(*) AS count FROM Systems WHERE name = ?", [system.name]);
        const existingSystemCount = existingSystemQuery.rows._array[0].count;
        if (existingSystemCount === 0) {
          const insertQuery = "INSERT INTO Systems (name, link, description) VALUES (?, ?, ?)";
          await executeSql(insertQuery, [system.name, system.link, system.description]);
          console.log('System added to the database:', system.name);
        } else {
          console.log('System already exists in the database:', system.name);
        }
      }
    } catch (error) {
      console.error('Error adding systems to the database:', error);
    }
};

export const addSystems = async () => {
  addSystemsToDatabase(systemsToAdd);
};

const deleteSystemsFromDatabase = async (systemNames) => {
    try {
      for (const name of systemNames) {
        const existsQuery = "SELECT COUNT(*) AS count FROM Systems WHERE name = ?";
        const result = await executeSql(existsQuery, [name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`System '${name}' does not exist in the database. Skipping deletion.`);
          continue; // Skip to the next iteration
        }
  
        const deleteQuery = "DELETE FROM Systems WHERE name = ?";
        await executeSql(deleteQuery, [name]);
        console.log('System deleted from the database:', name);
      }
    } catch (error) {
      console.error('Error deleting systems from the database:', error);
    }
};
  
//deleteSystemsFromDatabase(systemsToDelete);

const updateSystemsInDatabase = async (systemsToUpdate) => {
    try {
      for (const system of systemsToUpdate) {
        const existsQuery = "SELECT COUNT(*) AS count FROM Systems WHERE name = ?";
        const result = await executeSql(existsQuery, [system.name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`System '${system.name}' does not exist in the database. Skipping update.`);
          continue; // Skip to the next iteration
        }
  
        const updateQuery = "UPDATE Systems SET link = ?, description = ? WHERE name = ?";
        await executeSql(updateQuery, [system.link, system.description, system.name]);
        console.log('System updated in the database:', system.name);
      }
    } catch (error) {
      console.error('Error updating systems in the database:', error);
    }
};

export const updateSystems = async () => {
  updateSystemsInDatabase(systemsToUpdate);
};