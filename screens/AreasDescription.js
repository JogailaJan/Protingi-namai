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

const AreasDescription = ({ route }) => {
  const [serviceAreas, setServiceAreas] = useState([]);
  const [functionalityVisibility, setFunctionalityVisibility] = useState([]);
  const [functionalityDescriptionVisibility, setFunctionalityDescriptionVisibility] = useState([]);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const areas = await getServiceAreas();
      setServiceAreas(areas);
      // Initialize functionalityVisibility, functionalityDescriptionVisibility, and directions
      const initialVisibility = new Array(areas.length).fill(true);
      const initialDescriptionVisibility = areas.map(area => new Array(area.functionalities.length).fill(true));
      const initialDirections = new Array(areas.length).fill('up');
      setFunctionalityVisibility(initialVisibility);
      setFunctionalityDescriptionVisibility(initialDescriptionVisibility);
      setDirections(initialDirections);
    };
    fetchData();
  }, []);

  const toggleDirection = (index) => {
    setDirections(prevDirections => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === 'up' ? 'down' : 'up';
      return newDirections;
    });
  };

  const toggleFunctionalityVisibility = (index) => {
    setFunctionalityVisibility(prevVisibility => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const toggleFunctionalityDescriptionVisibility = (areaIndex, funcIndex) => {
    setFunctionalityDescriptionVisibility(prevDescriptionVisibility => {
      const newDescriptionVisibility = [...prevDescriptionVisibility];
      newDescriptionVisibility[areaIndex][funcIndex] = !newDescriptionVisibility[areaIndex][funcIndex];
      return newDescriptionVisibility;
    });
  };

  return (
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
                source={directions[index] === 'up' ? require("../arrow-down.png") : require("../arrow-right.png")}
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
                      onPress={() => toggleFunctionalityDescriptionVisibility(index, funcIndex)}
                      style={styles.functionalitiesContainer}
                    >
                      <View style={styles.row}>
                        <Text style={styles.functionalityText}>{functionality.name}</Text>
                      </View>
                    </TouchableOpacity>
                    {functionalityDescriptionVisibility.length > 0 && functionalityDescriptionVisibility[index][funcIndex] && (
                      <Text>{functionality.longDescription}</Text>
                    )}

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
  );
};

export default AreasDescription;

  const [lightingExpanded, setLightingExpanded] = useState(false); // Naujas state skirtas apšvietimui
  const [blindsExpanded, setBlindsExpanded] = useState(false); // Naujas state skirtas žaliuzėms
  const [securityExpanded, setSecurityExpanded] = useState(false); // Naujas state skirtas security
  const [heatingExpanded, setHeatingExpanded] = useState(false); // Naujas state skirtas heating
  const [scenesExpanded, setScenesExpanded] = useState(false); // Naujas state skirtas heating
  const [energyExpanded, setEnergyExpanded] = useState(false); // Naujas state skirtas heating
  const [weatherExpanded, setWeatherExpanded] = useState(false); // Naujas state skirtas heating

  const lightingButtons = [
    // Mygtukai skirti apšvietimui
    { title: "Perjungimas", description: "Čia yra Perjungimo aprašymas" },
    {
      title: "Sviesos intesyvumo reguliavimas",
      description: "Čia yra Sviesos intesyvumo reguliavimo aprašymas",
    },
    {
      title: "Spalvos temperatura",
      description: "Čia yra Spalvos temperatūros aprašymas",
    },
    { title: "Spalva", description: "Čia yra Spalvos aprašymas" },
    { title: "Seka", description: "Čia yra Sekos aprašymas" },
  ];

  const blindsButtons = [
    // Mygtukai skirti žaliuzėms
    { title: "Langinės", description: "Čia yra Langinių aprašymas" },
    { title: "Markizės", description: "Čia yra Markizių aprašymas" },
    {
      title: "Vėdinimo sklendės",
      description: "Čia yra Vėdinimo sklendžių aprašymas",
    },
    { title: "Stoglangiai", description: "Čia yra Stoglangių aprašymas" },
  ];

  const securityButtons = [
    // Mygtukai skirti žaliuzėms
    { title: "Nuotėkis", description: "Čia yra Nuotėkis aprašymas" },
    { title: "Kondensatas", description: "Čia yra Kondensatas aprašymas" },
    {
      title: "CO2",
      description: "Čia yra CO2 aprašymas",
    },
    {
      title: "Audra / lietus",
      description: "Čia yra Audra / lietus aprašymas",
    },
  ];
  const heatingButtons = [
    // Mygtukai skirti žaliuzėms
    {
      title: "Grindinis šildymas",
      description: "Čia yra Grindinis šildymas aprašymas",
    },
    {
      title: "Radiatoriaus termostatas",
      description: "Čia yra Radiatoriaus termostatas aprašymas",
    },
    {
      title: "Ventiliacija",
      description: "Čia yra Ventiliacija aprašymas",
    },
    {
      title: "Boileris",
      description: "Čia yra Boileris aprašymas",
    },
    {
      title: "Sieninis termostatas",
      description: "Čia yra Sieninis termostatas aprašymas",
    },
  ];
  const scenesButtons = [
    // Mygtukai skirti žaliuzėms
    {
      title: "Scenos per sieninį perdavėją",
      description: "Čia yra Scenos per sieninį perdavėją  aprašymas",
    },
    {
      title: "Scenos per programėlę",
      description: "Čia yra Scenos per programėlę  aprašymas",
    },
    {
      title: "Scenos per balsų valdymą",
      description: "Čia yra Scenos per balsų valdymą aprašymas",
    },
    {
      title: "Iki 34 scenų",
      description: "Čia yra Ventiliacija aprašymas",
    },
    {
      title: "Daugiau nei 100 scenų",
      description: "Čia yra Daugiau nei 100 scenų aprašymas",
    },
    {
      title: "Neribotas scenų kiekis",
      description: "Čia yra Sieninis termostatas aprašymas",
    },
  ];
  const energyButtons = [
    // Mygtukai skirti žaliuzėms
    {
      title: "Energijos matavimas",
      description: "Čia yra Energijos matavimas  aprašymas",
    },
    {
      title: "SENEC namų baterijos saugojimas ",
      description: "Čia yra SENEC namų baterijos saugojimas   aprašymas",
    },
  ];
  const weatherButtons = [
    // Mygtukai skirti žaliuzėms
    {
      title: "Oro prognozė",
      description: "Čia yra Oro prognozė aprašymas",
    },
    {
      title: "Oro stotelė",
      description: "Čia yra Oro stotelė aprašymas",
    },
    {
      title: "Taisyklių kūrimas audrų atveju",
      description: "Čia yra Taisyklių kūrimas audrų atveju aprašymas",
    },
  ];

  const toggleLightingExpanded = () => {
    setLightingExpanded(!lightingExpanded);
  };

  const toggleBlindsExpanded = () => {
    setBlindsExpanded(!blindsExpanded);
  };

  const toggleSecurityExpanded = () => {
    setSecurityExpanded(!securityExpanded);
  };

  const toggleHeatingExpanded = () => {
    setHeatingExpanded(!heatingExpanded);
  };

  const toggleScenesExpanded = () => {
    setScenesExpanded(!scenesExpanded);
  };

  const toggleEnergyExpanded = () => {
    setEnergyExpanded(!energyExpanded);
  };

  const toggleWeatherExpanded = () => {
    setWeatherExpanded(!weatherExpanded);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image source={require("../photos/logo.png")} style={styles.logo} />
          <Text>________________________________________________</Text>
        </View>
        <TouchableOpacity
          onPress={toggleLightingExpanded}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>
            {lightingExpanded ? "Apšvietimas" : "Apšvietimas"}
          </Text>
        </TouchableOpacity>
        {lightingExpanded && (
          <View style={styles.expandedContainer}>
            {lightingButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleBlindsExpanded}
          style={styles.buttonStyle2}
        >
          <Text style={styles.buttonText}>
            {blindsExpanded ? "Žaliuzės" : "Žaliuzės"}
          </Text>
        </TouchableOpacity>
        {blindsExpanded && (
          <View style={styles.expandedContainer2}>
            {blindsButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleSecurityExpanded}
          style={styles.buttonStyle3}
        >
          <Text style={styles.buttonText}>
            {securityExpanded ? "Apsauga" : "Apsauga"}
          </Text>
        </TouchableOpacity>
        {securityExpanded && (
          <View style={styles.expandedContainer2}>
            {securityButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleHeatingExpanded}
          style={styles.buttonStyle3}
        >
          <Text style={styles.buttonText}>
            {heatingExpanded ? "Šildymas" : "Šildymas"}
          </Text>
        </TouchableOpacity>
        {heatingExpanded && (
          <View style={styles.expandedContainer3}>
            {heatingButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleScenesExpanded}
          style={styles.buttonStyle4}
        >
          <Text style={styles.buttonText}>
            {scenesExpanded ? "Scenos" : "Scenos"}
          </Text>
        </TouchableOpacity>
        {scenesExpanded && (
          <View style={styles.expandedContainer4}>
            {scenesButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleEnergyExpanded}
          style={styles.buttonStyle2}
        >
          <Text style={styles.buttonText}>
            {energyExpanded ? "Energija" : "Energija"}
          </Text>
        </TouchableOpacity>
        {energyExpanded && (
          <View style={styles.expandedContainer5}>
            {energyButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={toggleWeatherExpanded}
          style={styles.buttonStyle5}
        >
          <Text style={styles.buttonText}>
            {weatherExpanded ? "Oras" : "Oras"}
          </Text>
        </TouchableOpacity>
        {weatherExpanded && (
          <View style={styles.expandedContainer6}>
            {weatherButtons.map((button) => (
              <ButtonWithDescription
                key={button.title}
                title={button.title}
                description={button.description}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.line2}></View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../photos/namas.png")}
            style={styles.footerImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  logoContainer: {
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
    marginLeft: 'auto',
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
});
