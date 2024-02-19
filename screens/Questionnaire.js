import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import data from '../CategoriesAndFunctionalities';


const Questionnaire = () => {
  const [selectedItems, setSelectedItems] = useState({ subCategories: [], mainCategories: [] });
  const [subCategoryVisibility, setSubCategoryVisibility] = useState(Array(data.length).fill(false));

  const handleMainCategoryCheckboxPress = (value) => {
    setSelectedItems(prevState => {
      const mainCategoryIndex = prevState.mainCategories.findIndex(item => item.value === value);
      if (mainCategoryIndex !== -1) {
        prevState.mainCategories.splice(mainCategoryIndex, 1);
      } else {
        prevState.mainCategories.push({ value });
      }
      return { ...prevState };
    });
  };

  const toggleSubCategoryVisibility = (index) => {
    setSubCategoryVisibility(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleMainCategoryTextPress = (index) => {
    toggleSubCategoryVisibility(index);
  };

  const handleSubCategoryPress = (group, value) => {
    setSelectedItems(prevState => {
      const subCategoryIndex = prevState.subCategories.findIndex(item => item.group === group && item.value === value);
      if (subCategoryIndex !== -1) {
        prevState.subCategories.splice(subCategoryIndex, 1);
      } else {
        prevState.subCategories.push({ group, value });
      }
      return { ...prevState };
    });
  };

  // Log the updated list whenever selectedItems changes
  React.useEffect(() => {
    console.log("Updated list:", selectedItems);
  }, [selectedItems]);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.mainCategoryContainer}>
            <View style={styles.row}>
              <Checkbox
                value={selectedItems.mainCategories.some(category => category.value === item.value)}
                onValueChange={() => handleMainCategoryCheckboxPress(item.value)}
              />
              <TouchableOpacity onPress={() => handleMainCategoryTextPress(index)}>
                <Text style={styles.mainCategoryText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            {subCategoryVisibility[index] && (
              <FlatList
                data={item.subCategories}
                renderItem={({ item: subCategory }) => (
                  <TouchableOpacity onPress={() => handleSubCategoryPress(subCategory.group, subCategory.value)}>
                    <View style={styles.row}>
                      <Checkbox
                        value={selectedItems.subCategories.some(category => category.value === subCategory.value && category.group === subCategory.group)}
                        onValueChange={() => handleSubCategoryPress(subCategory.group, subCategory.value)}
                      />
                      <Text>{subCategory.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(subCategory, index) => index.toString()}
              />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  mainCategoryContainer: {
    marginBottom: 10, // Adjust as needed
    paddingLeft: 10,
  },
  mainCategoryText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 8, // Adjust as needed
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5, // Adjust as needed
    marginTop: 15,
  },
});
