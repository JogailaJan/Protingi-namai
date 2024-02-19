import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import data from '../CategoriesAndFunctionalities';


const Questionnaire = () => {
  const [selectedItems, setSelectedItems] = useState({ subCategories: [], mainCategories: [] });

  const handleMainCategoryPress = (value) => {
    setSelectedItems(prevState => {
      const mainCategoryIndex = prevState.mainCategories.findIndex(category => category.value === value);

      if (mainCategoryIndex !== -1) {
        // Category exists, remove it
        const updatedMainCategories = [...prevState.mainCategories];
        updatedMainCategories.splice(mainCategoryIndex, 1);
        
        return {
          ...prevState,
          mainCategories: updatedMainCategories
        };
      } else {
        // Category doesn't exist, add it
        return {
          ...prevState,
          mainCategories: [
            ...prevState.mainCategories,
            { name: `Maincategory ${prevState.mainCategories.length + 1}`, value }
          ]
        };
      }
    });
  };

  const handleSubCategoryPress = (group, value) => {
    setSelectedItems(prevState => {
      const subCategoryIndex = prevState.subCategories.findIndex(category => category.value === value && category.group === group);

      if (subCategoryIndex !== -1) {
        // Category exists, remove it
        const updatedSubCategories = [...prevState.subCategories];
        updatedSubCategories.splice(subCategoryIndex, 1);

        return {
          ...prevState,
          subCategories: updatedSubCategories
        };
      } else {
        // Category doesn't exist, add it
        return {
          ...prevState,
          subCategories: [
            ...prevState.subCategories,
            { name: `Subcategory ${prevState.subCategories.length + 1}`, group, value }
          ]
        };
      }
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
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleMainCategoryPress(item.value)}>
              <Text>{item.mainCategory}</Text>
            </TouchableOpacity>
            <FlatList
              data={item.subCategories}
              renderItem={({ item: subCategory }) => (
                <TouchableOpacity onPress={() => handleSubCategoryPress(item.mainCategory, subCategory.value)}>
                  <Text>{subCategory.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(subCategory, index) => index.toString()}
            />
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
});
