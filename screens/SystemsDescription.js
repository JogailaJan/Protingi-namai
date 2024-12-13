import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from "react-native";

export default function SystemsDescription({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../photos/logo.png")} style={styles.logo} />
      <View style={styles.linefirst}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("LBManagement")}
      >
        <Text style={styles.buttonText}>LB Management</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        onPress={() => navigation.navigate("EnetSmartHome")}
      >
        <Text style={styles.buttonText}>eNet Smart Home</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
        onPress={() => navigation.navigate("JungHome")}
      >
        <Text style={styles.buttonText}>Jung Home</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>

      <TouchableOpacity
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

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    width: Math.min(150, Math.max(50, 80 * (height / 100))),
    height: Math.min(150, Math.max(50, 80 * (height / 100))),
    marginVertical: Math.min(50, Math.max(10, 5 * (height / 100))),
  },
  buttonText: {
    color: "black",
    fontSize: Math.min(30, Math.max(10, 3 * (height/ 100))),
    marginVertical: Math.min(50, Math.max(5, 3 * (height / 100))),
    fontWeight: "bold",
  },
  linefirst: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
    marginBottom: Math.min(80, Math.max(20, 5 * (height / 100))),
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
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
