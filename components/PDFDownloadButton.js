
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';

const PDFDownloadButton = ({ config }) => {
  const createAndSavePDF = async () => {
    try {
      console.log(config);
      // Check and request permission if needed
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to save PDF files.',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      }

      const htmlContent = generateHTML(config); // Generate HTML content for the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Determine the destination directory based on the platform
      const directory = Platform.OS === 'ios' ? FileSystem.documentDirectory : FileSystem.cacheDirectory;

      // Create a unique file name for the PDF
      const fileName = 'config.pdf';

      // Move the PDF file to the desired directory
      await FileSystem.moveAsync({
        from: uri,
        to: `${directory}${fileName}`,
      });

      // Inform the user that the PDF has been downloaded
      alert('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error saving PDF:', error);
      alert('Failed to download PDF.');
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
    <TouchableOpacity onPress={createAndSavePDF} style={[styles.pdfButton]}>
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
