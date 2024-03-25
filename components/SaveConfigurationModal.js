import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SaveConfigurationModal = ({ visible, onSave, onCancel }) => {
  const [configurationName, setConfigurationName] = useState('');

  const handleSave = () => {
    onSave(configurationName);
    setConfigurationName('');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Konfigūracijos pavadinimas:</Text>
          <TextInput
            style={styles.input}
            value={configurationName}
            onChangeText={text => setConfigurationName(text)}
            placeholder="Suteikite konfigūracijai pavadinimą"
          />
          <View style={styles.buttonsContainer}>
            <Button title="Atšaukti" onPress={onCancel} />
            <Button title="Išsaugoti" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
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
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SaveConfigurationModal;
