import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getServiceAreas } from "../ServiceAreasAndFunctionalities";

const AreasDescription = ({ navigation }) => {
  const [serviceAreas, setServiceAreas] = useState([]);
  const [functionalityVisibility, setFunctionalityVisibility] = useState([]);
  const [
    functionalityDescriptionVisibility,
    setFunctionalityDescriptionVisibility,
  ] = useState([]);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const areas = await getServiceAreas();
      setServiceAreas(areas);
      // Initialize functionalityVisibility, functionalityDescriptionVisibility, and directions
      const initialVisibility = new Array(areas.length).fill(true);
      const initialDescriptionVisibility = areas.map((area) =>
        new Array(area.functionalities.length).fill(true)
      );
      const initialDirections = new Array(areas.length).fill("up");
      setFunctionalityVisibility(initialVisibility);
      setFunctionalityDescriptionVisibility(initialDescriptionVisibility);
      setDirections(initialDirections);
    };
    fetchData();
  }, []);

  const toggleDirection = (index) => {
    setDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "up" ? "down" : "up";
      return newDirections;
    });
  };

  const toggleFunctionalityVisibility = (index) => {
    setFunctionalityVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const toggleFunctionalityDescriptionVisibility = (areaIndex, funcIndex) => {
    setFunctionalityDescriptionVisibility((prevDescriptionVisibility) => {
      const newDescriptionVisibility = [...prevDescriptionVisibility];
      newDescriptionVisibility[areaIndex][funcIndex] =
        !newDescriptionVisibility[areaIndex][funcIndex];
      return newDescriptionVisibility;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceAreas}
        renderItem={({ item, index }) => (
          <View style={styles.serviceAreaContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  toggleFunctionalityVisibility(index);
                  toggleDirection(index);
                }}
                style={styles.textContainer}
              >
                <Text style={styles.serviceAreaText}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleFunctionalityVisibility(index);
                  toggleDirection(index);
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
            <View style={styles.separator}></View>
            {functionalityVisibility[index] && (
              <>
                <Text>{item.longDescription}</Text>
                <FlatList
                  data={item.functionalities}
                  renderItem={({ item: functionality, index: funcIndex }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          toggleFunctionalityDescriptionVisibility(
                            index,
                            funcIndex
                          )
                        }
                        style={styles.functionalitiesContainer}
                      >
                        <View style={styles.row}>
                          <Text style={styles.functionalityText}>
                            {functionality.name}
                          </Text>
                        </View>
                        <View style={styles.separator2}></View>
                      </TouchableOpacity>
                      {functionalityDescriptionVisibility.length > 0 &&
                        functionalityDescriptionVisibility[index][
                          funcIndex
                        ] && <Text>{functionality.longDescription}</Text>}
                    </View>
                  )}
                  keyExtractor={(functionality, index) => index.toString()}
                />
              </>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.break}></View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../photos/namas.png")}
            style={styles.footerImage}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default AreasDescription;

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
    flex: 1,
  },
  arrowContainer: {
    marginLeft: "auto",
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
  separator2: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    marginBottom: 5,
    marginTop: 5,
    width: "80%",
  },
  break: {
    marginTop: 50,
  },
  footer: {
    width: "100%",
    backgroundColor: "black",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  footerImage: {
    width: 48,
    height: 48,
  },
});
