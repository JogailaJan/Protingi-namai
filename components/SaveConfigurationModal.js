import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const SaveConfigurationModal = ({visible, onDismiss}) => {
  const [configurationName, setConfigurationName] = useState('');

  const handleSave = async (name) => {
    // if (selectedConfiguration) {
    //   const updatedConfigurations = savedConfigurations.map((config) => {
    //     if (config.name === selectedConfiguration.name) {
    //       return { name: selectedConfiguration.name, items: selectedItems };
    //     }
    //     return config;
    //   });
    //   setSavedConfigurations(updatedConfigurations);
    //   await AsyncStorage.setItem(
    //     STORAGE_KEY,
    //     JSON.stringify(updatedConfigurations)
    //   );
    // } else {
    //   saveConfiguration(name);
    // }
    // onDismiss();
    // setConfigurationName("");
  };

  const saveConfiguration = async (name) => {
    // try {
    //   console.log("Saving configuration with name:", name);
    //   console.log("Items:", selectedItems);
    //   const updatedConfigurations = [
    //     ...savedConfigurations,
    //     { name: name, items: selectedItems },
    //   ];
    //   await AsyncStorage.setItem(
    //     STORAGE_KEY,
    //     JSON.stringify(updatedConfigurations)
    //   );
    //   setSavedConfigurations(updatedConfigurations);
    //   console.log(
    //     "Number of configurations saved:",
    //     updatedConfigurations.length
    //   );
    // } catch (error) {
    //   console.error("Error saving configuration:", error);
    // }
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
    zIndex: -1,
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
