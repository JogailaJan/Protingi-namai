import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <TouchableOpacity onPress={() => navigation.navigate('Questionnaire', { selectedConfiguration: item })}>
              <Text>{item.name || `${index + 1} konfigūracija`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteConfiguration(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Ištrinti</Text>
            </TouchableOpacity>
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  configurationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
