import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

export default function SystemsDescription({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../photos/logo.png")} style={styles.logo} />
      <View style={styles.linefirst}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LBManagement")}
      >
        <Text style={styles.buttonText}>LB Management</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EnetSmartHome")}
      >
        <Text style={styles.buttonText}>eNet Smart Home</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("JungHome")}
      >
        <Text style={styles.buttonText}>Jung Home</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Knx")}
      >
        <Text style={styles.buttonText}>KNX System</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

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
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  linefirst: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
    marginBottom: 80,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 10,
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
