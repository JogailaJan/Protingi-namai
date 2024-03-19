
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const PDFDownloadButton = ({ config }) => {
  const printToFile = async () => {
//     const html = `
// <html>
//   <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
//   </head>
//   <body style="text-align: center;">
//     <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
//       Hello Expo!
//     </h1>
//     <img
//       src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
//       style="width: 90vw;" />
//   </body>
// </html>
// `;
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
              h1 {
                color: blue;
              }
              /* Add more styles as needed */
            </style>
          </head>
          <body>
            <h1>Configuration</h1>
            <h2>Selected Functionalities:</h2>
            <ul>
              ${items.functionalities.map(func => `<li>${func.group}: ${func.value}</li>`).join('')}
            </ul>
            <h2>Selected Service Areas:</h2>
            <ul>
              ${items && items.serviceAreas ? items.serviceAreas.map(area => `<li>${area.value}</li>`).join('') : ''}
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

  return (
    <TouchableOpacity onPress={printToFile} style={[styles.pdfButton]}>
      <Text style={[styles.pdfButtonText]}>Atsiųsti PDF</Text>
    </TouchableOpacity>
  );
};

export default PDFDownloadButton;

const styles = StyleSheet.create({
  pdfButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    alignItems: "center",
  },
  pdfButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
