import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const STORAGE_KEY = "savedConfigurations";

const SaveConfigurationModal = ({visible, onDismiss, selectedConfiguration, newItems, selectedConfigurationName}) => {
  const [configurationName, setConfigurationName] = useState('');
  const [savedConfigurations, setSavedConfigurations] = useState([]);

  useEffect(() => {
    const loadSavedConfigurations = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          setSavedConfigurations(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading saved configurations:", error);
      }
    };
    if(selectedConfigurationName){
      setConfigurationName(selectedConfigurationName);
    }
    loadSavedConfigurations();
  }, []);


  const handleSave = async () => {
    if (selectedConfiguration) {
      const updatedConfigurations = savedConfigurations.map((config) => {
        if (config.name === selectedConfiguration.name) {
          return { name: selectedConfiguration.name, items: newItems };
        }
        return config;
      });
      setSavedConfigurations(updatedConfigurations);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedConfigurations)
      );
    } else {
      saveConfiguration(configurationName);
    }
    onDismiss();
    setConfigurationName("");
  };

  // const clearAsyncStorage = async (key) => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     console.log(`AsyncStorage data for key '${key}' has been cleared.`);
  //   } catch (error) {
  //     console.error(`Error clearing AsyncStorage data for key '${key}':`, error);
  //   }
  // };
  
  // // Call the function with the key you want to clear
  // clearAsyncStorage(STORAGE_KEY);
  
  const saveConfiguration = async (name) => {
    try {
      console.log("Saving configuration with name:", name);
      console.log("Items:", newItems);
      const updatedConfigurations = [
        ...savedConfigurations,
        { name: name, items: newItems },
      ];
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedConfigurations)
      );
      setSavedConfigurations(updatedConfigurations);
      console.log(
        "Number of configurations saved:",
        updatedConfigurations.length
      );
      console.log(updatedConfigurations);
    } catch (error) {
      console.error("Error saving configuration:", error);
    }
  };

  const handleCancel = () => {
    onDismiss();
    //setIsSaveModalVisible(false);
    console.log("Atsaukiama, todel slepiama")
    setConfigurationName("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.modalContainer,
        {
          display: visible ? 'flex' : 'none',
        },
      ]}
    >
      <View style={styles.modalContent}>
        <Text style={styles.label}>Konfigūracijos pavadinimas:</Text>
        <TextInput
          style={styles.input}
          value={configurationName}
          onChangeText={text => setConfigurationName(text)}
          placeholder="Suteikite konfigūracijai pavadinimą"
        />
        <View style={styles.buttonsContainer}>
          <Button title="Atšaukti" onPress={handleCancel} />
          <Button title="Išsaugoti" onPress={handleSave} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute', // Set position to absolute
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%', // Ensure TextInput takes full width
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SaveConfigurationModal;
