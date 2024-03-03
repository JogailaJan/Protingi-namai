import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import serviceAreas from '../ServiceAreasAndFunctionalities';
import systems from '../Systems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveConfigurationModal from '../components/SaveConfigurationModal';
import PDFDownloadButton from '../components/PDFDownloadButton'; // Import the PDFDownloadButton component

const STORAGE_KEY = 'savedConfigurations';

const Questionnaire = ({ route }) => {
  const { selectedConfiguration } = route.params || {};

  const [selectedItems, setSelectedItems] = useState({ functionalities: [], serviceAreas: [] });
  const [functionalityVisibility, setFunctionalityVisibility] = useState(Array(serviceAreas.length).fill(false));
  const [savedConfigurations, setSavedConfigurations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [configurationName, setConfigurationName] = useState('');

  const handleSaveButtonPress = () => {
    if (selectedConfiguration) {
      handleSave(selectedConfiguration.name);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleSave = async (name) => {
    if (selectedConfiguration) {
      const updatedConfigurations = savedConfigurations.map(config => {
        if (config.name === selectedConfiguration.name) {
          return { name: selectedConfiguration.name, items: selectedItems };
        }
        return config;
      });
      setSavedConfigurations(updatedConfigurations);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigurations));
    } else {
      saveConfiguration(name);
    }
    setIsModalVisible(false);
    setConfigurationName('');
  };

  useEffect(() => {
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
    
    loadSavedConfigurations();
  }, []);
  
  const saveConfiguration = async (name) => {
    try {
      console.log('Saving configuration with name:', name);
      console.log('Items:', selectedItems);
      
      const updatedConfigurations = [...savedConfigurations, { name: name, items: selectedItems }];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigurations));
      setSavedConfigurations(updatedConfigurations);
      
      console.log('Number of configurations saved:', updatedConfigurations.length);
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setConfigurationName('');
  };

  useEffect(() => {
    if (selectedConfiguration) {
      setSelectedItems(selectedConfiguration.items);
    }
  }, [selectedConfiguration]);

  const handleServiceAreaCheckboxPress = (value) => {
    setSelectedItems(prevState => {
      const serviceAreaIndex = prevState.serviceAreas.findIndex(item => item.value === value);
      if (serviceAreaIndex !== -1) {
        prevState.serviceAreas.splice(serviceAreaIndex, 1);
      } else {
        prevState.serviceAreas.push({ value });
      }
      return { ...prevState };
    });
  };

  const toggleFunctionalityVisibility = (index) => {
    setFunctionalityVisibility(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleServiceAreaTextPress = (index) => {
    toggleFunctionalityVisibility(index);
  };

  const handleFunctionalityPress = (group, value) => {
    setSelectedItems(prevState => {
      const functionalityIndex = prevState.functionalities.findIndex(item => item.group === group && item.value === value);
      if (functionalityIndex !== -1) {
        prevState.functionalities.splice(functionalityIndex, 1);
      } else {
        prevState.functionalities.push({ group, value });
      }
      return { ...prevState };
    });
  };

  function filterSystems() {
    const filteredSystems = [];
    systems.forEach(system => {
        let meetsCriteria = true;
        if (selectedItems.serviceAreas && selectedItems.serviceAreas.length > 0) {
            selectedItems.serviceAreas.forEach(category => {
                const serviceArea = system.serviceAreas.find(area => area.name === category.value);
                if (!serviceArea) {
                    meetsCriteria = false;
                }
            });
        }
        if (selectedItems.functionalities && selectedItems.functionalities.length > 0) {
            selectedItems.functionalities.forEach(functionality => {
                const serviceArea = system.serviceAreas.find(area => area.name === functionality.group);
                if (!serviceArea) {
                    meetsCriteria = false;
                } else {
                    if (!serviceArea.functionalities || !serviceArea.functionalities.includes(functionality.value)) {
                        meetsCriteria = false;
                    }
                }
            });
        }
        if (meetsCriteria) {
            filteredSystems.push(system.name);
        }
    });
    return filteredSystems;
}

  return (
    <View>
      <FlatList
        data={serviceAreas}
        renderItem={({ item, index }) => (
          <View style={styles.serviceAreaContainer}>
            <View style={styles.row}>
              <Checkbox
                value={selectedItems.serviceAreas.some(category => category.value === item.value)}
                onValueChange={() => handleServiceAreaCheckboxPress(item.value)}
              />
              <TouchableOpacity onPress={() => handleServiceAreaTextPress(index)}>
                <Text style={styles.serviceAreaText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            {functionalityVisibility[index] && (
              <FlatList
                data={item.functionalities}
                renderItem={({ item: functionality }) => (
                  <TouchableOpacity onPress={() => handleFunctionalityPress(functionality.group, functionality.value)}>
                    <View style={styles.row}>
                      <Checkbox
                        value={selectedItems.functionalities.some(category => category.value === functionality.value && category.group === functionality.group)}
                        onValueChange={() => handleFunctionalityPress(functionality.group, functionality.value)}
                      />
                      <Text>{functionality.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(functionality, index) => index.toString()}
              />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Systems */}
      <FlatList
        data={filterSystems()}
        renderItem={({ item }) => (
          <View style={styles.systemContainer}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={handleSaveButtonPress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Išsaugoti konfigūraciją</Text>
      </TouchableOpacity>
      {/* PDF Download Button */}
      <PDFDownloadButton config={[{ items: selectedItems }]} />
      <SaveConfigurationModal
        visible={isModalVisible}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceAreaContainer: {
    marginBottom: 10, 
    paddingLeft: 10,
  },
  serviceAreaText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 8, 
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5, 
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  systemContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});
