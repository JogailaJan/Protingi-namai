import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ButtonWithDescription = ({ title, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
      {isVisible && <Text style={styles.buttonDescription}>{description}</Text>}
      <View style={styles.line}></View>
    </View>
  );
};

export default function AreasDescription() {
  const navigation = useNavigation();

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
  logo: {
    width: 150,
    height: 150,
  },
  buttonStyle: {
    backgroundColor: "transparent",
    padding: 2,
    marginRight: 100,
  },
  buttonStyle2: {
    backgroundColor: "transparent",
    padding: 2,
    marginRight: 123,
    marginTop: 10,
  },
  buttonStyle3: {
    backgroundColor: "transparent",
    padding: 2,
    marginRight: 120,
    marginTop: 10,
  },
  buttonStyle4: {
    backgroundColor: "transparent",
    padding: 2,
    marginRight: 129,
    marginTop: 10,
  },
  buttonStyle5: {
    backgroundColor: "transparent",
    padding: 2,
    marginRight: 144,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    textAlign: "left",
    fontWeight: "bold",
  },
  buttonDescription: {
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  line: {
    width: 230,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  line2: {
    width: "80.5%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 100,
  },
  expandedContainer: {
    marginTop: 10,
  },
  expandedContainer2: {
    marginTop: 10,
    marginRight: 84,
  },
  expandedContainer3: {
    marginTop: 10,
    marginRight: 55,
  },
  expandedContainer4: {
    marginTop: 10,
    marginRight: 35,
  },
  expandedContainer5: {
    marginTop: 10,
    marginLeft: 8,
  },
  expandedContainer6: {
    marginTop: 10,
    marginRight: 23,
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
    width: 50,
    height: 50,
  },
});
