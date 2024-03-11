import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import serviceAreas from "../ServiceAreasAndFunctionalities";
import systems from "../Systems";

const Questionnaire = () => {
  const [selectedItems, setSelectedItems] = useState({
    functionalities: [],
    serviceAreas: [],
  });
  const [functionalityVisibility, setFunctionalityVisibility] = useState(
    Array(serviceAreas.length).fill(false)
  );

  const handleServiceAreaCheckboxPress = (value) => {
    setSelectedItems((prevState) => {
      const serviceAreaIndex = prevState.serviceAreas.findIndex(
        (item) => item.value === value
      );
      if (serviceAreaIndex !== -1) {
        prevState.serviceAreas.splice(serviceAreaIndex, 1);
      } else {
        prevState.serviceAreas.push({ value });
      }
      return { ...prevState };
    });
  };

  const toggleFunctionalityVisibility = (index) => {
    setFunctionalityVisibility((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleServiceAreaTextPress = (index) => {
    toggleFunctionalityVisibility(index);
  };

  const handleFunctionalityPress = (group, value) => {
    setSelectedItems((prevState) => {
      const functionalityIndex = prevState.functionalities.findIndex(
        (item) => item.group === group && item.value === value
      );
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
    systems.forEach((system) => {
      let meetsCriteria = true;
      // Check serviceAreas
      if (selectedItems.serviceAreas && selectedItems.serviceAreas.length > 0) {
        selectedItems.serviceAreas.forEach((category) => {
          const serviceArea = system.serviceAreas.find(
            (area) => area.name === category.value
          );
          if (!serviceArea) {
            meetsCriteria = false;
          }
        });
      }
      // Check functionalities
      if (
        selectedItems.functionalities &&
        selectedItems.functionalities.length > 0
      ) {
        selectedItems.functionalities.forEach((functionality) => {
          const serviceArea = system.serviceAreas.find(
            (area) => area.name === functionality.group
          );
          if (!serviceArea) {
            meetsCriteria = false;
          } else {
            if (
              !serviceArea.functionalities ||
              !serviceArea.functionalities.includes(functionality.value)
            ) {
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

  // Log the updated list whenever selectedItems changes
  React.useEffect(() => {
    console.log("Updated list:", selectedItems);
    console.log(filterSystems());
  }, [selectedItems]);

  return (
    <View>
      <FlatList
        data={serviceAreas}
        renderItem={({ item, index }) => (
          <View style={styles.serviceAreaContainer}>
            <View style={styles.row}>
              <Checkbox
                value={selectedItems.serviceAreas.some(
                  (category) => category.value === item.value
                )}
                onValueChange={() => handleServiceAreaCheckboxPress(item.value)}
              />
              <TouchableOpacity
                onPress={() => handleServiceAreaTextPress(index)}
              >
                <Text style={styles.serviceAreaText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            {functionalityVisibility[index] && (
              <FlatList
                style={styles.functionalitiesContainer}
                data={item.functionalities}
                renderItem={({ item: functionality }) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleFunctionalityPress(
                        functionality.group,
                        functionality.value
                      )
                    }
                  >
                    <View style={styles.row}>
                      <Checkbox
                        value={selectedItems.functionalities.some(
                          (category) =>
                            category.value === functionality.value &&
                            category.group === functionality.group
                        )}
                        onValueChange={() =>
                          handleFunctionalityPress(
                            functionality.group,
                            functionality.value
                          )
                        }
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
    </View>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceAreaContainer: {
    marginBottom: 10, // Adjust as needed
    paddingLeft: 10,
    backgroundColor: "black",
  },
  functionalitiesContainer: {
    marginBottom: 10, // Adjust as needed
    paddingLeft: 10,
    backgroundColor: "pink",
  },
  serviceAreaText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 8, // Adjust as needed
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 5, // Adjust as needed
    marginTop: 15,
  },
});
