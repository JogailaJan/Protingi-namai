
import React from 'react';
import {  WebView, TouchableOpacity, Text, PermissionsAndroid, Platform, Alert} from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { StorageAccessFramework } from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import HTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

const PDFDownloadButton = ({ config }) => {

  const createAndSavePDF = async () => {
     // Replace with your actual HTML content
      const htmlContent = `
      <h1>This is your PDF content</h1>
      <p>You can add any HTML elements here.</p>
    `;

    const options = {
      base64: true, // Optionally set to true to get base64 encoded PDF data
      fileName: 'my-pdf.pdf', // Optional file name
      path: RNFS.DocumentDirectoryPath + '/PDFs/', // Optional path (consider platform-specific solutions)
    };

    try {
      const pdfData = await HTMLtoPDF.convert(htmlContent, options);

      // Handle successful conversion
      if (options.base64) {
        // Use base64 data for further actions (e.g., saving to device)
        console.log('PDF base64 data:', pdfData);
      } else {
        // Handle saved PDF file (platform-specific saving logic required)
        console.log('PDF saved successfully!');
      }
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
    }
  };

  const generateHTML = (config) => {
    // Check if config is an array and contains at least one element
    if (Array.isArray(config) && config.length > 0) {
      // Access the first element of the array
      const firstConfig = config[0];
      // Extract the configuration data from the first element
      const { items } = firstConfig;
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
              ${items.serviceAreas.map(area => `<li>${area.name}</li>`).join('')}
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
    <TouchableOpacity onPress={createAndSavePDF}>
      <Text>Download PDF</Text>
    </TouchableOpacity>
  );
};

export default PDFDownloadButton;

