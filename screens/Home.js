import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export default function Home({ navigation }) {
  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../photos/logo.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Smart Home")}
      >
        <Text style={styles.buttonText}>Išmanūs Namai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Systems Description")}
      >
        <Text style={styles.buttonText}>Sistemų Aprašymai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Areas Description")}
      >
        <Text style={styles.buttonText}>Sričių Aprašymai</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Questionnaire")}
      >
        <Text style={styles.buttonText}>Klausimynas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.buttonText}>Mėgstamiausi</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
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
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  line: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "black",
    width: 220,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
