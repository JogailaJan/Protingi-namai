import React from 'react';
import { StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

// const PDFDownloadButton = ({ config }) => {
  export const printToFile = async (config) => {
    const html = generateHTML(config);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const generateHTML = (config) => {
    // Check if config is an array and contains at least one element
    console.log(config);
    if (Array.isArray(config) && config.length > 0) {
      // Access the first element of the array
      const firstConfig = config[0];
      // Extract the configuration data from the first element
      const { items } = firstConfig;
      items.serviceAreas.map(area => console.log(area));
      items.functionalities.map(func => console.log(func))
      // Generate HTML content using the extracted data
      const htmlContent = `
      <html>
        <head>
          <title>Configuration</title>
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
          <h2>Pasirintos paslaugos:</h2>
          <ul>
          ${items && items.serviceAreas
            ? items.serviceAreas.map(area => `
              <li>${area.name}</li>
              <ul>
                ${items.functionalities && items.functionalities.length > 0
                  ? items.functionalities.map(func => 
                    func.group === area.group
                      ? `<li>${func.name}</li>`
                      : ''
                    ).join('')
                  : ''
                }
              </ul>
            `).join('')
            : ''
          }         
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

//   return (
//     <TouchableOpacity onPress={printToFile}>
//     </TouchableOpacity>
//   );
// };

// export default PDFDownloadButton;