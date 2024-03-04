// const CREATE_TABLE_SYSTEMS = `
//   CREATE TABLE IF NOT EXISTS Systems (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     link TEXT NOT NULL,
//     description TEXT
//     -- Add other relevant columns as needed
// );

// CREATE TABLE IF NOT EXISTS ServiceAreas (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     value TEXT NOT NULL,
//     description TEXT
//     -- Add other relevant columns as needed
// );

// CREATE TABLE IF NOT EXISTS Functionalities (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     group_name TEXT NOT NULL,
//     value TEXT NOT NULL,
//     description TEXT
//     -- Add other relevant columns as needed
// );

// CREATE TABLE IF NOT EXISTS SystemServiceAreas (
//     system_id INTEGER,
//     service_area_id INTEGER,
//     PRIMARY KEY (system_id, service_area_id),
//     FOREIGN KEY (system_id) REFERENCES Systems(id),
//     FOREIGN KEY (service_area_id) REFERENCES ServiceAreas(id)
// );

// CREATE TABLE IF NOT EXISTS ServiceAreaFunctionalities (
//     service_area_id INTEGER,
//     functionality_id INTEGER,
//     PRIMARY KEY (service_area_id, functionality_id),
//     FOREIGN KEY (service_area_id) REFERENCES ServiceAreas(id),
//     FOREIGN KEY (functionality_id) REFERENCES Functionalities(id)
// );

// CREATE TABLE IF NOT EXISTS CommunicationStandards (
//     id INTEGER PRIMARY KEY,
//     system_id INTEGER,
//     standard TEXT NOT NULL,
//     FOREIGN KEY (system_id) REFERENCES Systems(id)
// );
// `;

// const INSERT_SYSTEMS_DATA = `
// INSERT INTO Systems (name, link, description) VALUES 
// ('LB MANAGEMENT', 'http://system1', ''),
// ('eNet SMART HOME', 'http://system2', ''),
// ('KNX SMART VISU SERVER', 'http://system3', ''),
// ('KNX VISU PRO SERVER', 'http://system4', '');

// -- Insert data into ServiceAreas table
// INSERT INTO ServiceAreas (name, value, description) VALUES 
// ('Lighting', 'lighting', ''),
// ('Blinds', 'blinds', ''),
// ('Security', 'security', ''),
// ('HVAC', 'hvac', ''),
// ('Scenes', 'scenes', ''),
// ('Energy', 'energy', ''),
// ('Weather', 'weather', ''),
// ('Window and Door Monitoring', 'window-and-door-monitoring', '');

// -- Insert data into Functionalities table
// INSERT INTO Functionalities (name, group_name, value, description) VALUES 
// ('Switching', 'lighting', 'switching', ''),
// ('Blinds', 'blinds', 'blinds', ''),
// ('Storm/Rain Satellite Unit', 'security', 'storm-rain-satellite-unit', ''),
// ('Storm/Rain Universal Transmitter', 'security', 'storm-rain-universal-transmitter', ''),
// ('Storm/Rain', 'security', 'storm-rain', ''),
// ('Leakage', 'security', 'leakage', ''),
// ('Radiator Thermostat', 'hvac', 'radiator-thermostat', ''),
// ('Boiler', 'hvac', 'boiler', ''),
// ('Scenes via Wall Transmitter', 'scenes', 'scenes-via-wall-transmitter', ''),
// ('Over 100 Scenes', 'scenes', 'over-100-scenes', ''),
// ('Energy Measurement', 'energy', 'energy-measurement', ''),
// ('SENEC Home Battery Storage', 'energy', 'SENEC-Home-battery-storage', ''),
// ('Weather Forecast', 'weather', 'weather-forecast', ''),
// ('Creation of Rules', 'weather', 'creation-of-rules', ''),
// ('Window and Door Monitoring', 'window-and-door-monitoring', 'window-and-door-monitoring', '');

// -- Insert data into SystemServiceAreas table
// -- Insert data into SystemServiceAreas table
// -- LB MANAGEMENT service areas
// INSERT INTO SystemServiceAreas (system_id, service_area_id) 
// VALUES 
// ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
// ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
// ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Security'));

// -- eNet SMART HOME service areas
// INSERT INTO SystemServiceAreas (system_id, service_area_id) 
// VALUES 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Energy'));

// -- KNX SMART VISU SERVER service areas
// INSERT INTO SystemServiceAreas (system_id, service_area_id) 
// VALUES 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Energy')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Weather')), 
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'));

// -- KNX VISU PRO SERVER service areas
// INSERT INTO SystemServiceAreas (system_id, service_area_id) 
// VALUES 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Energy')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Weather')), 
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'));

// -- Insert data into CommunicationStandards table
// INSERT INTO CommunicationStandards (system_id, standard) 
// VALUES 
// ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), 'bluetooth-LE'),
// ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), 'wireless'),
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'eNet'),
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'wireless'),
// ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'REG-bus'),
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'KNX'),
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'IP'),
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'wireless'),
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'TP'),
// ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'ethernet'),
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'KNX'),
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'IP'),
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'wireless'),
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'TP'),
// ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'ethernet');


// -- Insert data into ServiceAreaFunctionalities table
// -- Lighting functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Switching')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Colour')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Sequences'));

// -- Blinds functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Blinds'), (SELECT id FROM Functionalities WHERE name = 'Blinds')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Blinds'), (SELECT id FROM Functionalities WHERE name = 'Skylights'));

// -- Security functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain Satellite Unit')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain Universal Transmitter')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Leakage'));

// -- HVAC functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'HVAC'), (SELECT id FROM Functionalities WHERE name = 'Radiator Thermostat')),
// ((SELECT id FROM ServiceAreas WHERE name = 'HVAC'), (SELECT id FROM Functionalities WHERE name = 'Boiler'));

// -- Scenes functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Scenes'), (SELECT id FROM Functionalities WHERE name = 'Scenes via Wall Transmitter')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Scenes'), (SELECT id FROM Functionalities WHERE name = 'Over 100 Scenes'));

// -- Energy functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Energy'), (SELECT id FROM Functionalities WHERE name = 'Energy Measurement')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Energy'), (SELECT id FROM Functionalities WHERE name = 'SENEC Home Battery Storage'));

// -- Weather functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Weather'), (SELECT id FROM Functionalities WHERE name = 'Weather Forecast')),
// ((SELECT id FROM ServiceAreas WHERE name = 'Weather'), (SELECT id FROM Functionalities WHERE name = 'Creation of Rules'));

// -- Window and Door Monitoring functionalities
// INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
// VALUES
// ((SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'), (SELECT id FROM Functionalities WHERE name = 'Window and Door Monitoring'));

// `;
// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('example.db');

// export const createTables = () => {
//     db.transaction(tx => {
//       tx.executeSql(CREATE_TABLE_SYSTEMS); // Use the imported queries
//       tx.executeSql(INSERT_SYSTEMS_DATA); // Use the imported queries
//     });
// };

// export const fetchServiceAreas = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             `SELECT * FROM ServiceAreas`,
//             [],
//             (_, { rows }) => {
//             const serviceAreasData = rows._array.map(area => ({
//                 name: area.name,
//                 value: area.value,
//                 description: area.description,
//                 functionalities: [] // Initialize with an empty array for now
//             }));
//             setFetchedServiceAreas(serviceAreasData);
//             },
//             (_, error) => console.error('Error fetching service areas:', error)
//         );
//     });
// };

// export const fetchFunctionalities = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             `SELECT sa.name AS service_area_name, f.name, f.group_name, f.value, f.description 
//             FROM Functionalities f 
//             INNER JOIN ServiceAreaFunctionalities saf ON f.id = saf.functionality_id 
//             INNER JOIN ServiceAreas sa ON saf.service_area_id = sa.id`,
//             [],
//             (_, { rows }) => {
//             const functionalitiesData = rows._array.reduce((acc, curr) => {
//                 const existingAreaIndex = acc.findIndex(area => area.name === curr.service_area_name);
//                 if (existingAreaIndex !== -1) {
//                 acc[existingAreaIndex].functionalities.push({
//                     name: curr.name,
//                     group: curr.group_name,
//                     description: curr.description,
//                     value: curr.value
//                 });
//                 }
//                 return acc;
//             }, fetchedServiceAreas);
//             setFetchedServiceAreas(functionalitiesData);
//             },
//             (_, error) => console.error('Error fetching functionalities:', error)
//         );
//     });
// };

// export const fetchSystems = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             `SELECT s.name, s.link, s.description, c.standard, sa.name AS service_area_name, f.name AS functionality_name
//             FROM Systems s
//             INNER JOIN CommunicationStandards c ON s.id = c.system_id
//             INNER JOIN SystemServiceAreas ssa ON s.id = ssa.system_id
//             INNER JOIN ServiceAreas sa ON ssa.service_area_id = sa.id
//             INNER JOIN ServiceAreaFunctionalities saf ON sa.id = saf.service_area_id
//             INNER JOIN Functionalities f ON saf.functionality_id = f.id`,
//             [],
//             (_, { rows }) => {
//             const systemsData = rows._array.reduce((acc, curr) => {
//                 const existingSystemIndex = acc.findIndex(system => system.name === curr.name);
//                 if (existingSystemIndex !== -1) {
//                 const existingAreaIndex = acc[existingSystemIndex].serviceAreas.findIndex(area => area.name === curr.service_area_name);
//                 if (existingAreaIndex !== -1) {
//                     acc[existingSystemIndex].serviceAreas[existingAreaIndex].functionalities.push(curr.functionality_name);
//                 } else {
//                     acc[existingSystemIndex].serviceAreas.push({
//                     name: curr.service_area_name,
//                     functionalities: [curr.functionality_name]
//                     });
//                 }
//                 if (!acc[existingSystemIndex].communicationStandartAndMedia.includes(curr.standard)) {
//                     acc[existingSystemIndex].communicationStandartAndMedia.push(curr.standard);
//                 }
//                 } else {
//                 acc.push({
//                     name: curr.name,
//                     link: curr.link,
//                     description: curr.description,
//                     communicationStandartAndMedia: [curr.standard],
//                     serviceAreas: [
//                     {
//                         name: curr.service_area_name,
//                         functionalities: [curr.functionality_name]
//                     }
//                     ]
//                 });
//                 }
//                 return acc;
//                 }, []);
//             setFetchedSystems(systemsData);
//             },
//             (_, error) => console.error('Error fetching systems:', error)
//         );
//     });
// };

// module.exports = {
//     CREATE_TABLE_SYSTEMS,
//     INSERT_SYSTEMS_DATA,
//     fetchServiceAreas,
//     fetchFunctionalities,
//     fetchSystems,
//     createTables,
//   // Export other queries as needed
// };

import * as SQLite from 'expo-sqlite';

const CREATE_TABLE_SYSTEMS = `
  CREATE TABLE IF NOT EXISTS Systems (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT
    -- Add other relevant columns as needed
  );
`;

const CREATE_TABLE_SERVICE_AREAS = `
  CREATE TABLE IF NOT EXISTS ServiceAreas (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT
    -- Add other relevant columns as needed
  );
`;

const CREATE_TABLE_FUNCTIONALITIES = `
  CREATE TABLE IF NOT EXISTS Functionalities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    group_name TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT
    -- Add other relevant columns as needed
  );
`;

const CREATE_TABLE_SYSTEM_SERVICE_AREAS = `
  CREATE TABLE IF NOT EXISTS SystemServiceAreas (
    system_id INTEGER,
    service_area_id INTEGER,
    PRIMARY KEY (system_id, service_area_id),
    FOREIGN KEY (system_id) REFERENCES Systems(id),
    FOREIGN KEY (service_area_id) REFERENCES ServiceAreas(id)
  );
`;

const CREATE_TABLE_SERVICE_AREA_FUNCTIONALITIES = `
  CREATE TABLE IF NOT EXISTS ServiceAreaFunctionalities (
    service_area_id INTEGER,
    functionality_id INTEGER,
    PRIMARY KEY (service_area_id, functionality_id),
    FOREIGN KEY (service_area_id) REFERENCES ServiceAreas(id),
    FOREIGN KEY (functionality_id) REFERENCES Functionalities(id)
  );
`;

const CREATE_TABLE_COMMUNICATION_STANDARDS = `
  CREATE TABLE IF NOT EXISTS CommunicationStandards (
    id INTEGER PRIMARY KEY,
    system_id INTEGER,
    standard TEXT NOT NULL,
    FOREIGN KEY (system_id) REFERENCES Systems(id)
  );
`;

const INSERT_SYSTEMS_DATA = `
  -- Insert data into Systems table
  INSERT INTO Systems (name, link, description) VALUES 
  ('LB MANAGEMENT', 'http://system1', ''),
  ('eNet SMART HOME', 'http://system2', ''),
  ('KNX SMART VISU SERVER', 'http://system3', ''),
  ('KNX VISU PRO SERVER', 'http://system4', '');

  -- Insert data into ServiceAreas table
  INSERT INTO ServiceAreas (name, value, description) VALUES 
  ('Lighting', 'lighting', ''),
  ('Blinds', 'blinds', ''),
  ('Security', 'security', ''),
  ('HVAC', 'hvac', ''),
  ('Scenes', 'scenes', ''),
  ('Energy', 'energy', ''),
  ('Weather', 'weather', ''),
  ('Window and Door Monitoring', 'window-and-door-monitoring', '');

  -- Insert data into Functionalities table
  INSERT INTO Functionalities (name, group_name, value, description) VALUES 
  ('Switching', 'lighting', 'switching', ''),
  ('Blinds', 'blinds', 'blinds', ''),
  ('Storm/Rain Satellite Unit', 'security', 'storm-rain-satellite-unit', ''),
  ('Storm/Rain Universal Transmitter', 'security', 'storm-rain-universal-transmitter', ''),
  ('Storm/Rain', 'security', 'storm-rain', ''),
  ('Leakage', 'security', 'leakage', ''),
  ('Radiator Thermostat', 'hvac', 'radiator-thermostat', ''),
  ('Boiler', 'hvac', 'boiler', ''),
  ('Scenes via Wall Transmitter', 'scenes', 'scenes-via-wall-transmitter', ''),
  ('Over 100 Scenes', 'scenes', 'over-100-scenes', ''),
  ('Energy Measurement', 'energy', 'energy-measurement', ''),
  ('SENEC Home Battery Storage', 'energy', 'SENEC-Home-battery-storage', ''),
  ('Weather Forecast', 'weather', 'weather-forecast', ''),
  ('Creation of Rules', 'weather', 'creation-of-rules', ''),
  ('Window and Door Monitoring', 'window-and-door-monitoring', 'window-and-door-monitoring', '');

  -- Insert data into SystemServiceAreas table
  -- LB MANAGEMENT service areas
  INSERT INTO SystemServiceAreas (system_id, service_area_id) 
  VALUES 
  ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
  ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
  ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), (SELECT id FROM ServiceAreas WHERE name = 'Security'));

  -- eNet SMART HOME service areas
  INSERT INTO SystemServiceAreas (system_id, service_area_id) 
  VALUES 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), (SELECT id FROM ServiceAreas WHERE name = 'Energy'));

  -- KNX SMART VISU SERVER service areas
  INSERT INTO SystemServiceAreas (system_id, service_area_id) 
  VALUES 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Energy')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Weather')), 
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'));

  -- KNX VISU PRO SERVER service areas
  INSERT INTO SystemServiceAreas (system_id, service_area_id) 
  VALUES 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Lighting')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Blinds')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Security')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'HVAC')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Scenes')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Energy')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Weather')), 
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), (SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'));

  -- Insert data into CommunicationStandards table
  INSERT INTO CommunicationStandards (system_id, standard) 
  VALUES 
  ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), 'bluetooth-LE'),
  ((SELECT id FROM Systems WHERE name = 'LB MANAGEMENT'), 'wireless'),
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'eNet'),
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'wireless'),
  ((SELECT id FROM Systems WHERE name = 'eNet SMART HOME'), 'REG-bus'),
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'KNX'),
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'IP'),
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'wireless'),
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'TP'),
  ((SELECT id FROM Systems WHERE name = 'KNX SMART VISU SERVER'), 'ethernet'),
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'KNX'),
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'IP'),
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'wireless'),
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'TP'),
  ((SELECT id FROM Systems WHERE name = 'KNX VISU PRO SERVER'), 'ethernet');
`;

const INSERT_SERVICE_AREA_FUNCTIONALITIES = `
  -- Insert data into ServiceAreaFunctionalities table
  -- Lighting functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Switching')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Colour')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Lighting'), (SELECT id FROM Functionalities WHERE name = 'Sequences'));

  -- Blinds functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Blinds'), (SELECT id FROM Functionalities WHERE name = 'Blinds')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Blinds'), (SELECT id FROM Functionalities WHERE name = 'Skylights'));

  -- Security functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain Satellite Unit')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain Universal Transmitter')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Storm/Rain')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Security'), (SELECT id FROM Functionalities WHERE name = 'Leakage'));

  -- HVAC functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'HVAC'), (SELECT id FROM Functionalities WHERE name = 'Radiator Thermostat')),
  ((SELECT id FROM ServiceAreas WHERE name = 'HVAC'), (SELECT id FROM Functionalities WHERE name = 'Boiler'));

  -- Scenes functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Scenes'), (SELECT id FROM Functionalities WHERE name = 'Scenes via Wall Transmitter')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Scenes'), (SELECT id FROM Functionalities WHERE name = 'Over 100 Scenes'));

  -- Energy functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Energy'), (SELECT id FROM Functionalities WHERE name = 'Energy Measurement')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Energy'), (SELECT id FROM Functionalities WHERE name = 'SENEC Home Battery Storage'));

  -- Weather functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Weather'), (SELECT id FROM Functionalities WHERE name = 'Weather Forecast')),
  ((SELECT id FROM ServiceAreas WHERE name = 'Weather'), (SELECT id FROM Functionalities WHERE name = 'Creation of Rules'));

  -- Window and Door Monitoring functionalities
  INSERT INTO ServiceAreaFunctionalities (service_area_id, functionality_id)
  VALUES
  ((SELECT id FROM ServiceAreas WHERE name = 'Window and Door Monitoring'), (SELECT id FROM Functionalities WHERE name = 'Window and Door Monitoring'));
`;

const db = SQLite.openDatabase('example.db');

const executeQuery = (query, successMessage, errorMessage) => {
    db.transaction(tx => {
        tx.executeSql(query, [], (_, result) => {
            console.log(successMessage);
            console.log(result);
        },
        (_, error) => console.error(errorMessage, error));
    });
};

// Execute queries
executeQuery(CREATE_TABLE_SYSTEMS, 'Systems table created successfully', 'Error creating Systems table');
// executeQuery(CREATE_TABLE_SERVICE_AREAS, 'ServiceAreas table created successfully', 'Error creating ServiceAreas table');
// executeQuery(CREATE_TABLE_FUNCTIONALITIES, 'Functionalities table created successfully', 'Error creating Functionalities table');
// executeQuery(CREATE_TABLE_SYSTEM_SERVICE_AREAS, 'SystemServiceAreas table created successfully', 'Error creating SystemServiceAreas table');
// executeQuery(CREATE_TABLE_SERVICE_AREA_FUNCTIONALITIES, 'ServiceAreaFunctionalities table created successfully', 'Error creating ServiceAreaFunctionalities table');
// executeQuery(CREATE_TABLE_COMMUNICATION_STANDARDS, 'CommunicationStandards table created successfully', 'Error creating CommunicationStandards table');
// executeQuery(INSERT_SYSTEMS_DATA, 'Data inserted into Systems table successfully', 'Error inserting data into Systems table');
// executeQuery(INSERT_SERVICE_AREA_FUNCTIONALITIES, 'Data inserted into ServiceAreaFunctionalities table successfully', 'Error inserting data into ServiceAreaFunctionalities table');

