import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import React, { useState, useEffect } from "react";
import { getServiceAreas } from "../ServiceAreasAndFunctionalities";
import { getSystems } from "../Systems";
import SaveConfigurationModal from "../components/SaveConfigurationModal";
import { printToFile } from "../backend/PDFDownload"; // Import the PDFDownloadButton component

const STORAGE_KEY = "savedConfigurations";

const Questionnaire = ({ route }) => {
  const [serviceAreas, setServiceAreas] = useState([]);
  const [systems, setSystems] = useState([]);
  const { selectedConfiguration } = route.params || {};

  const [selectedItems, setSelectedItems] = useState({
    functionalities: [],
    serviceAreas: [],
  });
  const [functionalityVisibility, setFunctionalityVisibility] = useState(
    Array(serviceAreas.length).fill(false)
  );
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [SelectedConfigurationName, setSelectedConfigurationName] = useState("");
  const [directions, setDirections] = useState(
    Array(serviceAreas.length).fill("up")
  );

  useEffect(() => {
    const fetchData = async () => {
      const areas = await getServiceAreas();
      setServiceAreas(areas);
      setSystems(await getSystems());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedConfiguration) {
      setSelectedConfigurationName(selectedConfiguration.name);
      setSelectedItems(selectedConfiguration.items);
    }
  }, [selectedConfiguration]);

  const handleSystemButtonPress = (link) => {
    Linking.openURL(link);
  };

  const handleSaveButtonPress = () => {
    // if (selectedConfiguration) {
    //   handleSave(selectedConfiguration.name);
    // } else {
      setIsSaveModalVisible(true);
    //}
  };

  const handleSaveModalDismiss = () => {
    setIsSaveModalVisible(false);
  };

  const toggleDirection = (index) => {
    setDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "up" ? "down" : "up";
      return newDirections;
    });
  };

  const handleServiceAreaCheckboxPress = (group, name) => {
    setSelectedItems((prevState) => {
      const serviceAreaIndex = prevState.serviceAreas.findIndex(
        (item) => item.group === group
      );
      if (serviceAreaIndex !== -1) {
        prevState.serviceAreas.splice(serviceAreaIndex, 1);
      } else {
        prevState.serviceAreas.push({ group, name });
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

  const handleFunctionalityPress = (group, value, name) => {
    setSelectedItems((prevState) => {
      const functionalityIndex = prevState.functionalities.findIndex(
        (item) => item.group === group && item.value === value
      );
      if (functionalityIndex !== -1) {
        prevState.functionalities.splice(functionalityIndex, 1);
      } else {
        prevState.functionalities.push({ group, value, name });
      }
      return { ...prevState };
    });
  };

  function filterSystems() {
    const filteredSystems = [];
    systems.forEach((system) => {
      let meetsCriteria = true;
      if (selectedItems.serviceAreas && selectedItems.serviceAreas.length > 0) {
        selectedItems.serviceAreas.forEach((category) => {
          const serviceArea = system.serviceAreas.find(
            (area) => area.name === category.group
          );
          if (!serviceArea) {
            meetsCriteria = false;
          }
        });
      }
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
        filteredSystems.push({ name: system.name, link: system.link });
      }
    });
    return filteredSystems;
  }

  // if(isSaveModalVisible){
  //   return(

  //   );
  // }
  //else
   return (
    <View>
      <FlatList
            data={serviceAreas}
            renderItem={({ item, index }) => (
              // Visas paslaugos srities su funkcijomis konteineris
              <View style={styles.serviceAreaContainer}>
                {/* Paslaugos srities checkboxas su pavadinimu */}
                <View style={styles.row}>
                  <Checkbox
                    value={selectedItems.serviceAreas.some(
                      (category) => category.group === item.group
                    )}
                    onValueChange={() =>
                      handleServiceAreaCheckboxPress(item.group, item.name)
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      handleServiceAreaTextPress(index);
                      toggleDirection(index);
                    }}
                    style={styles.textContainer}
                  >
                    <Text style={styles.serviceAreaText}>{item.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleServiceAreaTextPress(index);
                      toggleDirection(index); // Pass the index to toggle the direction for the specific item
                    }}
                    style={styles.arrowContainer}
                  >
                    <Image
                      source={
                        directions[index] === "up"
                          ? require("../arrow-down.png")
                          : require("../arrow-right.png")
                      }
                      style={styles.arrow}
                    />
                  </TouchableOpacity>
                </View>
                {/* Atskiriamoji linija */}
                <View style={styles.separator}></View>
                {functionalityVisibility[index] && (
                  <FlatList
                    data={item.functionalities}
                    renderItem={({ item: functionality }) => (
                      //Funkcijos chekboxas ir pavadinimas
                      <TouchableOpacity
                        onPress={() =>
                          handleFunctionalityPress(
                            functionality.group,
                            functionality.value,
                            functionality.name
                          )
                        }
                        style={styles.functionalitiesContainer}
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
                                functionality.value,
                                functionality.name
                              )
                            }
                          />
                          <Text style={styles.functionalityText}>
                            {functionality.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(functionality, index) => index.toString()}
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
              <>
              <View style={styles.systemsContainer}>
                <Text style={styles.systemsText}>Tinkančios sistemos</Text>
                {filterSystems().map((system, index) => (
                  <TouchableOpacity  key={index} style={styles.systemContainer} onPress={() => handleSystemButtonPress(system.link)}>
                    <Text style={styles.systemNameText} >{system.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

                {/* Sistemu sarasas */}
                {/* <View style={styles.table}>
                  <Text style={styles.tableHeader}>Tinkančios sistemos</Text>
                  {filterSystems().map((system, index) => (
                    <Text key={index} style={styles.tableRow}>
                      {system.name} - {system.link}
                    </Text>
                  ))}
                </View> */}
                <View
                  style={[
                    styles.row,
                    {
                      marginTop: 25,
                      paddingBottom: 20,
                      paddingLeft: 0,
                      justifyContent: "space-around",
                    },
                  ]}
                >
                  {/* Issaugoti konfiguracija mygtukas */}
                  <TouchableOpacity
                    onPress={handleSaveButtonPress}
                    style={[styles.saveButton]}
                  >
                    <Text style={styles.saveButtonText}>Išsaugoti konfigūraciją</Text>
                  </TouchableOpacity>
                  {/* Atsisiusti pdf mygtukas */}
                  {/* <PDFDownloadButton config={[{ items: selectedItems }]}  /> */}
                  <TouchableOpacity
                    onPress={() => printToFile([{ items: selectedItems }])}
                    style={styles.pdfButton}
                  >
                    <Text style={styles.pdfButtonText}>Išsaugoti PDF</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
       />
      <SaveConfigurationModal
      visible={isSaveModalVisible}
      onDismiss={handleSaveModalDismiss} // Pass the callback function
      selectedConfiguration={selectedConfiguration}
      newItems={selectedItems}
      selectedConfigurationName={SelectedConfigurationName}
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
  arrow: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1, // Occupy remaining space
  },
  arrowContainer: {
    marginLeft: "auto", // Push to the right
    marginRight: 30,
  },
  serviceAreaContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  functionalitiesContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  serviceAreaText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 8,
  },
  functionalityText: {
    fontSize: 15,
    marginLeft: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 5,
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  systemsContainer: {
    alignItems: "center",
  },
  systemContainer: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: 250
  },
  systemsText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
  },
  systemNameText: {
    fontSize: 19,
    fontWeight: 'bold'
  },

  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  tableHeader: {
    backgroundColor: "lightgray",
    padding: 10,
    fontWeight: "bold",
  },
  tableRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  pdfButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    alignItems: "center",
  },
  pdfButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
