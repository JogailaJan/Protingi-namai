import { executeSql } from '../ExecuteSQL';
import { serviceAreasToAdd } from "./Add";
import { serviceAreasToDelete } from "./Delete";
import { serviceAreasToUpdate } from "./Update";

const CREATE_TABLE_SERVICE_AREAS = `
    CREATE TABLE IF NOT EXISTS ServiceAreas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        "group" TEXT NOT NULL,
        longDescription TEXT,
        shortDescription TEXT
    );
`;

const DROP_TABLE_SERVICE_AREAS =`
  DROP TABLE IF EXISTS ServiceAreas;
`;

const DELETE_SERVICE_AREAS_DATA = `
    DELETE FROM ServiceAreas;
`;

export async function createServiceAreasTable() {
    console.log("Executing CREATE_TABLE_SERVICE_AREAS...");
    return executeSql(CREATE_TABLE_SERVICE_AREAS)
        .then(() => {
            console.log("CREATE_TABLE_SERVICE_AREAS executed successfully.");
        })
        .catch(error => {
            console.error("Error executing CREATE_TABLE_SERVICE_AREAS:", error);
        });
}

export async function dropServiceAreasTable(){
    return executeSql(DROP_TABLE_SERVICE_AREAS);
}

export async function deleteAllServiceAreasData() {
    return executeSql(DELETE_SERVICE_AREAS_DATA);
}

const addServiceAreasToDatabase = async (serviceAreas) => {
    try {
      for (const serviceArea of serviceAreas) {
        // Check if the service area already exists in the database
        const existingServiceAreaQuery = await executeSql("SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?", [serviceArea.name]);
        const existingServiceAreaCount = existingServiceAreaQuery.rows._array[0].count;
        if (existingServiceAreaCount === 0) {
          // If the service area doesn't exist, insert it into the database
          const insertQuery = "INSERT INTO ServiceAreas (name, `group`, longDescription, shortDescription) VALUES (?, ?, ?, ?)";
          await executeSql(insertQuery, [serviceArea.name, serviceArea.group, serviceArea.longDescription, serviceArea.shortDescription]);
          console.log('Service area added to the database:', serviceArea.name);
        } else {
          console.log('Service area already exists in the database:', serviceArea.name);
        }
      }
    } catch (error) {
      console.error('Error adding service areas to the database:', error);
    }
};


export const addServiceAreas = async () => {
  addServiceAreasToDatabase(serviceAreasToAdd);
};

// Function to delete selected service areas from the database
const deleteServiceAreasFromDatabase = async (serviceAreaNames) => {
    try {
      for (const name of serviceAreaNames) {
        // Check if the service area exists in the database
        const existsQuery = "SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?";
        const result = await executeSql(existsQuery, [name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`Service area '${name}' does not exist in the database. Skipping deletion.`);
          continue; // Skip to the next iteration
        }
  
        // Delete the service area from the database
        const deleteQuery = "DELETE FROM ServiceAreas WHERE name = ?";
        await executeSql(deleteQuery, [name]);
        console.log('Service area deleted from the database:', name);
      }
    } catch (error) {
      console.error('Error deleting service areas from the database:', error);
    }
};
  
//deleteServiceAreasFromDatabase(serviceAreasToDelete);

// Function to update selected service areas in the database
const updateServiceAreasInDatabase = async (serviceAreasToUpdate) => {
    try {
      for (const area of serviceAreasToUpdate) {
        // Check if the service area exists in the database
        const existsQuery = "SELECT COUNT(*) AS count FROM ServiceAreas WHERE name = ?";
        const result = await executeSql(existsQuery, [area.name]);
        const count = result.rows.item(0).count;
        
        if (count === 0) {
          console.log(`Service area '${area.name}' does not exist in the database. Skipping update.`);
          continue; // Skip to the next iteration
        }
  
        // Update the service area in the database
        const updateQuery = "UPDATE ServiceAreas SET `group` = ?, longDescription = ?, shortDescription = ? WHERE name = ?";
        await executeSql(updateQuery, [area.group, area.longDescription, area.shortDescription, area.name]);
        console.log('Service area updated in the database:', area.name);
      }
    } catch (error) {
      console.error('Error updating service areas in the database:', error);
    }
};
  
//updateServiceAreasInDatabase(serviceAreasToUpdate);