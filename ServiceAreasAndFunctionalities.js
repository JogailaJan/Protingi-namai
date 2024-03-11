const hardCodedServiceAreas = [
    {
      name: 'Lighting',
      value: 'lighting',
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Switching',
          group: 'lighting',
          value: 'switching',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Colour',
          group: 'lighting',
          value: 'colour',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Sequences',
          group: 'lighting',
          value: 'sequences',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
    {
      name: 'Security',
      value: 'security',    
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Storm/Rain Satellite Unit',
          group: 'security',
          value: 'storm-rain-satellite-unit',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Storm/Rain Universal Transmitter',
          group: 'security',
          value: 'storm-rain-universal-transmitter',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Storm/Rain',
          group: 'security',
          value: 'storm-rain',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Leakage',
          group: 'security',
          value: 'leakage',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
    {
      name: 'Weather',
      value: 'weather',    
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Weather forecast',
          group: 'weather',
          value: 'weather-forecast',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Weather station',
          group: 'weather',
          value: 'weather-station',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Creation of rules',
          group: 'weather',
          value: 'creation-of-rules',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
  ];
  
export default hardCodedServiceAreas;

import { fetchSystemsData, createFunctionalitiesTable, createServiceAreasTable, insertFunctionalitiesData, insertServiceAreasData, deleteAllServiceAreasData, getServiceAreasData, getFunctionalitiesData } from "./backend/Database";
// deleteAllServiceAreasData();
// insertServiceAreasData();
//insertFunctionalitiesData();
// const a = getFunctionalitiesData();

//console.log("Hard coded services - " + JSON.stringify(serviceAreas));
export async function getServiceAreas() {
    const serviceAreas = await getServiceAreasData();
    // console.log("Table services - " + JSON.stringify(serviceAreas));
    // console.log("Hard coded services - " + JSON.stringify(hardCodedServiceAreas));
    // console.log(hardCodedServiceAreas === serviceAreas);
    // console.log(JSON.stringify(hardCodedServiceAreas) === JSON.stringify(serviceAreas));
    return serviceAreas;
}

  