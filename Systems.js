const systemsData = {
    system1: {
        name: 'LB MANAGEMENT',
        link: 'http://system1',
        communicationStandartAndMedia: ['bluetooth-LE', 'wireless'],
        serviceAreas: {
            lighting: ['switching'],
            blinds: ['blinds'],
            security: ['storm-rain-satellite-unit']
        }
    },
    system2: {
        name: 'eNet SMART HOME',
        link: 'http://system2',
        communicationStandartAndMedia: ['eNet', 'wireless', 'REG-bus'],
        serviceAreas: {
            lighting: ['switching'],
            blinds: ['blinds'],
            security: ['storm-rain-universal-transmitter'],
            hvac: ['radiator-thermostat'],
            scenes: ['scenes-via-wall-transmitter'],
            energy: ['energy-measurement']
        }
    },
    system3: {
        name: 'KNX SMART VISU SERVER',
        link: 'http://system3',
        communicationStandartAndMedia: ['KNX', 'IP', 'wireless', 'TP', 'ethernet'],
        serviceAreas: {
            lighting: ['switching', 'colour'],
            blinds: ['blinds', 'skylights'],
            security: ['storm-rain', 'leakage'],
            hvac: ['radiator-thermostat', 'boiler'],
            scenes: ['scenes-via-wall-transmitter', 'over-100-scenes'],
            energy: ['energy-measurement'],
            weather: ['weather-forecast'],
            windowAndDoorMonitoring: ['window-and-door-monitoring']
        }
    },
    system4: {
        name: 'KNX VISU PRO SERVER',
        link: 'http://system4',
        communicationStandartAndMedia: ['KNX', 'IP', 'wireless', 'TP', 'ethernet'],
        serviceAreas: {
            lighting: ['switching', 'colour', 'sequences'],
            blinds: ['blinds', 'skylights'],
            security: ['storm-rain', 'leakage'],
            hvac: ['radiator-thermostat', 'boiler'],
            scenes: ['scenes-via-wall-transmitter', 'unlimited-scenes'],
            energy: ['energy-measurement', 'SENEC-Home-battery-storage'],
            weather: ['weather-forecast', 'creation-of-rules'],
            windowAndDoorMonitoring: ['window-and-door-monitoring']
        }
    }
};

const hardCodedSystems = [
    {
        name: 'LB MANAGEMENT',
        link: 'http://system1',
        communicationStandartAndMedia: ['bluetooth-LE', 'wireless'],
        serviceAreas: [
            {
                name: 'lighting',
                functionalities: ['switching'],
            },
            {
                name: 'blinds',
                functionalities: ['blinds'],
            },
            {
                name: 'security',
                functionalities: ['storm-rain-satellite-unit'],
            },
        ]
    },
    {
        name: 'eNet SMART HOME',
        link: 'http://system2',
        communicationStandartAndMedia: ['eNet', 'wireless', 'REG-bus'],
        serviceAreas: [
            {
                name: 'lighting',
                functionalities: ['switching'],
            },
            {
                name: 'blinds',
                functionalities: ['blinds'],
            },
            {
                name: 'security',
                functionalities: ['storm-rain-universal-transmitter'],
            },
            {
                name: 'hvac',
                functionalities: ['radiator-thermostat'],
            },
            {
                name: 'scenes',
                functionalities: ['scenes-via-wall-transmitter'],
            },
            {
                name: 'energy',
                functionalities: ['energy-measurement'],
            },
        ]
    },
    {
        name: 'KNX SMART VISU SERVER',
        link: 'http://system3',
        communicationStandartAndMedia: ['KNX', 'IP', 'wireless', 'TP', 'ethernet'],
        serviceAreas: [
            {
                name: 'lighting',
                functionalities: ['switching', 'colour'],
            },
            {
                name: 'blinds',
                functionalities: ['blinds', 'skylights'],
            },
            {
                name: 'security',
                functionalities: ['storm-rain', 'leakage'],
            },
            {
                name: 'hvac',
                functionalities: ['radiator-thermostat', 'boiler'],
            },
            {
                name: 'scenes',
                functionalities: ['scenes-via-wall-transmitter', 'over-100-scenes'],
            },
            {
                name: 'energy',
                functionalities: ['energy-measurement'],
            },
            {
                name: 'weather',
                functionalities: ['weather-forecast'],
            },
            {
                name: 'window-and-door-monitoring',
                functionalities: ['window-and-door-monitoring'],
            },
        ]
    },
    {
        name: 'KNX VISU PRO SERVER',
        link: 'http://system4',
        communicationStandartAndMedia: ['KNX', 'IP', 'wireless', 'TP', 'ethernet'],
        serviceAreas: [
            {
                name: 'lighting',
                functionalities: ['switching', 'colour', 'sequences'],
            },
            {
                name: 'blinds',
                functionalities: ['blinds', 'skylights'],
            },
            {
                name: 'security',
                functionalities: ['storm-rain', 'leakage'],
            },
            {
                name: 'hvac',
                functionalities: ['radiator-thermostat', 'boiler'],
            },
            {
                name: 'scenes',
                functionalities: ['scenes-via-wall-transmitter', 'unlimited-scenes'],
            },
            {
                name: 'energy',
                functionalities: ['energy-measurement', 'SENEC-Home-battery-storage'],
            },
            {
                name: 'weather',
                functionalities: ['weather-forecast', 'creation-of-rules'],
            },
            {
                name: 'window-and-door-monitoring',
                functionalities: ['window-and-door-monitoring'],
            },
        ]
    },
  ];

//   const hardCodedSystems = [
//     {
//         name: 'LB MANAGEMENT',
//         link: 'http://system1',
//         description: 'http://system4',
//         serviceAreas: [
//             {
//                 name: 'lighting',
//                 functionalities: ['switching'],
//             },
//             {
//                 name: 'blinds',
//                 functionalities: ['blinds'],
//             },
//             {
//                 name: 'security',
//                 functionalities: ['storm-rain-satellite-unit'],
//             },
//         ]
//     },
//     {
//         name: 'eNet SMART HOME',
//         link: 'http://system2',
//         description: 'http://system4',
//         serviceAreas: [
//             {
//                 name: 'lighting',
//                 functionalities: ['switching'],
//             },
//             {
//                 name: 'blinds',
//                 functionalities: ['blinds'],
//             },
//             {
//                 name: 'security',
//                 functionalities: ['storm-rain-universal-transmitter'],
//             },
//             {
//                 name: 'hvac',
//                 functionalities: ['radiator-thermostat'],
//             },
//             {
//                 name: 'scenes',
//                 functionalities: ['scenes-via-wall-transmitter'],
//             },
//             {
//                 name: 'energy',
//                 functionalities: ['energy-measurement'],
//             },
//         ]
//     },
//     {
//         name: 'KNX SMART VISU SERVER',
//         link: 'http://system3',
//         description: 'http://system4',
//         serviceAreas: [
//             {
//                 name: 'lighting',
//                 functionalities: ['switching', 'colour'],
//             },
//             {
//                 name: 'blinds',
//                 functionalities: ['blinds', 'skylights'],
//             },
//             {
//                 name: 'security',
//                 functionalities: ['storm-rain', 'leakage'],
//             },
//             {
//                 name: 'hvac',
//                 functionalities: ['radiator-thermostat', 'boiler'],
//             },
//             {
//                 name: 'scenes',
//                 functionalities: ['scenes-via-wall-transmitter', 'over-100-scenes'],
//             },
//             {
//                 name: 'energy',
//                 functionalities: ['energy-measurement'],
//             },
//             {
//                 name: 'weather',
//                 functionalities: ['weather-forecast'],
//             },
//             {
//                 name: 'window-and-door-monitoring',
//                 functionalities: ['window-and-door-monitoring'],
//             },
//         ]
//     },
//     {
//         name: 'KNX VISU PRO SERVER',
//         link: 'http://system4',
//         description: 'http://system4',
//         serviceAreas: [
//             {
//                 name: 'lighting',
//                 functionalities: ['switching', 'colour', 'sequences'],
//             },
//             {
//                 name: 'blinds',
//                 functionalities: ['blinds', 'skylights'],
//             },
//             {
//                 name: 'security',
//                 functionalities: ['storm-rain', 'leakage'],
//             },
//             {
//                 name: 'hvac',
//                 functionalities: ['radiator-thermostat', 'boiler'],
//             },
//             {
//                 name: 'scenes',
//                 functionalities: ['scenes-via-wall-transmitter', 'unlimited-scenes'],
//             },
//             {
//                 name: 'energy',
//                 functionalities: ['energy-measurement', 'SENEC-Home-battery-storage'],
//             },
//             {
//                 name: 'weather',
//                 functionalities: ['weather-forecast', 'creation-of-rules'],
//             },
//             {
//                 name: 'window-and-door-monitoring',
//                 functionalities: ['window-and-door-monitoring'],
//             },
//         ]
//     },
//   ];
  export default hardCodedSystems;
 // console.log(systems);

 import { createSystemsFunctionalitiesTable, createSystemsTable, insertSystemsData , insertSystemsFunctionalitiesData, getSystemsData } from "./backend/Database";

 export async function getSystems() {
    const systems = await getSystemsData();
    // console.log("Table services - " + JSON.stringify(serviceAreas));
    // console.log("Hard coded services - " + JSON.stringify(hardCodedServiceAreas));
    // console.log(hardCodedServiceAreas === serviceAreas);
    // console.log(JSON.stringify(hardCodedServiceAreas) === JSON.stringify(serviceAreas));
    return systems;
}
 