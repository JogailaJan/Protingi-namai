import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import data from '../CategoriesAndFunctionalities';


const Questionnaire = () => {
  const [selectedItems, setSelectedItems] = useState({ subCategories: [], mainCategories: [] });

  const handleMainCategoryPress = (value) => {
    setSelectedItems(prevState => {
      const mainCategoryIndex = prevState.mainCategories.findIndex(item => item.value === value);
      if (mainCategoryIndex !== -1) {
        prevState.mainCategories.splice(mainCategoryIndex, 1);
      } else {
        prevState.mainCategories.push({ name: `Maincategory ${prevState.mainCategories.length + 1}`, value });
      }
      return { ...prevState };
    });
  };

  const handleSubCategoryPress = (group, value) => {
    setSelectedItems(prevState => {
      const subCategoryIndex = prevState.subCategories.findIndex(item => item.group === group && item.value === value);
      if (subCategoryIndex !== -1) {
        prevState.subCategories.splice(subCategoryIndex, 1);
      } else {
        prevState.subCategories.push({ name: `Subcategory ${prevState.subCategories.length + 1}`, group, value });
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
