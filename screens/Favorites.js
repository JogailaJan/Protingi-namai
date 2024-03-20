import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { printToFile } from "../backend/PDFDownload"; // Import the PDFDownloadButton component

const STORAGE_KEY = 'savedConfigurations';

export default function Favorites({ navigation }) {
  const [savedConfigurations, setSavedConfigurations] = useState([]);

  useEffect(() => {
    loadSavedConfigurations();
  }, []);

  const loadSavedConfigurations = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setSavedConfigurations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved configurations:', error);
    }
  };

  const deleteConfiguration = async (index) => {
    try {
      const updatedConfigurations = savedConfigurations.filter((_, i) => i !== index);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigurations));
      setSavedConfigurations(updatedConfigurations);
    } catch (error) {
      console.error('Error deleting configuration:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedConfigurations}
        renderItem={({ item, index }) => (
          <View style={styles.configurationItem}>
            <View style={styles.nameContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Questionnaire', { selectedConfiguration: item })}>
                <Text style={styles.nameText}>{item.name || `${index + 1} konfigūracija`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Questionnaire', { selectedConfiguration: item })}>
                <Image source={require("../icons/magnifying-glass.png")}  style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => printToFile([{ items: item.items }])}>
                <Image source={require("../icons/download.png")}  style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteConfiguration(index)}>
                <Image source={require("../icons/trash-bin.png")}  style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  configurationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nameText: {
    fontSize: 18,
  },
  nameContainer: {
    flexDirection: 'row', // Align name horizontally
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    marginLeft: 10, // Add spacing between icons
  },
});
