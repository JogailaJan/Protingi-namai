import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getServiceAreas } from '../ServiceAreasAndFunctionalities';



// const PDFDownloadButton = ({ config }) => {
export const printToFile = async (config) => {
  const html = await generateHTML(config);
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const { uri } = await Print.printToFileAsync({ html });
  console.log('File has been saved to:', uri);
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};

const generateHTML = async (config) => {
  // Check if config is an array and contains at least one element
  const ServiceAreasAndFunctionalities = await getServiceAreas();
  console.log(config);
  if (Array.isArray(config) && config.length > 0) {
    // Access the first element of the array
    const firstConfig = config[0];
    // Extract the configuration data from the first element
    let { items } = firstConfig;
    if(serviceAreas){
      //serviceAreas.map(area => console.log(area));
    }
    if(functionalities){
      //functionalities.map(func => console.log(func))
    }

    // Generate HTML content using the extracted data
    let htmlContent = `
      <html>
        <head>
          <title>Konfigūracija</title>
          <style>
            /* Add CSS styles for better presentation */
            body {
              font-family: Arial, sans-serif;
            }
            /* Add more styles as needed */
          </style>
        </head>
        <body>
          <h1>Pasirinkta konfigūracija</h1>
          <ul>
    `;
    let functionalities = [...items.functionalities];
    let serviceAreas = [...items.serviceAreas];

    while(serviceAreas.length > 0){
      htmlContent += `<li>${serviceAreas[0].name}</li>`;
      htmlContent += `<ul>`;
      for(let i = 0 ; i < functionalities.length; i++){
        if(functionalities[i].group == serviceAreas[0].group){
          htmlContent += `<li>${functionalities[i].name}</li>`;
          functionalities.splice(i, 1); 
          i--;
        }
      }
      htmlContent += `</ul>`;
      serviceAreas.shift();
    }

    while(functionalities.length > 0){
      for(let i = 0; i < ServiceAreasAndFunctionalities.length; i++){
        if(functionalities.length > 0){
          if(functionalities[0].group == ServiceAreasAndFunctionalities[i].group){
            htmlContent += `<li>${ServiceAreasAndFunctionalities[i].name}</li>`;
            htmlContent += `<ul>`;
            for(let y = 0 ; y < functionalities.length; y++){
              if(functionalities[y].group == ServiceAreasAndFunctionalities[i].group){
                htmlContent += `<li>${functionalities[y].name}</li>`;
                functionalities.splice(y, 1); 
                y--;
              }
            }
            htmlContent += `</ul>`;
          }
        }
      }
    }

    htmlContent += `
          </ul>
        </body>
      </html>
    `;
  return htmlContent;
  } else {
    // Handle case where config is empty or not in the expected format
    console.error('Error: Invalid config format');
    return ''; // Return empty string or handle the error as needed
  }
};

