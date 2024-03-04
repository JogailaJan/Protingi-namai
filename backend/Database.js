// import * as SQLite from 'expo-sqlite';
// import { useState, useEffect } from 'react';

// const CREATE_TABLE_SYSTEMS = `
//   CREATE TABLE Systems (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     link TEXT NOT NULL,
//     description TEXT
//   );
// `;

// const INSERT_SYSTEMS_DATA = `
//   -- Insert data into Systems table
//   INSERT INTO Systems (name, link, description) VALUES 
//   ('LB MANAGEMENT', 'http://system1', ''),
//   ('eNet SMART HOME', 'http://system2', ''),
//   ('KNX SMART VISU SERVER', 'http://system3', ''),
//   ('KNX VISU PRO SERVER', 'http://system4', '');
// `;



// const DROP_TABLE_SYSTEMS = `DROP TABLE Systems;`;

// const db = SQLite.openDatabase('test.db');

// const executeQuery = (query, actionMessage) => {
//     console.log(actionMessage);
//     db.transaction(tx => {
//         tx.executeSql(query);
//     });
// };

// // Execute queries
// //executeQuery(DROP_TABLE_SYSTEMS, 'Dropping Systems table');
// executeQuery(CREATE_TABLE_SYSTEMS, 'Creating Systems table');
// // executeQuery(CREATE_TABLE_SERVICE_AREAS, 'ServiceAreas table created successfully', 'Error creating ServiceAreas table');
// // executeQuery(CREATE_TABLE_FUNCTIONALITIES, 'Functionalities table created successfully', 'Error creating Functionalities table');
// // executeQuery(CREATE_TABLE_SYSTEM_SERVICE_AREAS, 'SystemServiceAreas table created successfully', 'Error creating SystemServiceAreas table');
// // executeQuery(CREATE_TABLE_SERVICE_AREA_FUNCTIONALITIES, 'ServiceAreaFunctionalities table created successfully', 'Error creating ServiceAreaFunctionalities table');
// // executeQuery(CREATE_TABLE_COMMUNICATION_STANDARDS, 'CommunicationStandards table created successfully', 'Error creating CommunicationStandards table');
// executeQuery(INSERT_SYSTEMS_DATA, 'Inserting data into Systems table');
// // executeQuery(INSERT_SERVICE_AREA_FUNCTIONALITIES, 'Data inserted into ServiceAreaFunctionalities table successfully', 'Error inserting data into ServiceAreaFunctionalities table');


// const fetchSystemsData = () => {
//     const [systems, setSystems] = useState([]);
    
//     useEffect(() => {
//         db.transaction((tx) => {
//             tx.executeSql("SELECT * FROM Systems", [], (_, { rows }) => {
//                 const systemsData = rows._array; // Accessing the array of results
//                 console.log("systemsData is ", JSON.stringify(systemsData)); // Use JSON.stringify to log array contents
//                 setSystems(systemsData); // Updating state with fetched data
//             });
//         });
//     }, []); // Empty dependency array to run effect only once
    
//     return systems;
// };


// export default fetchSystemsData;