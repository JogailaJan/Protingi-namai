import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

export default function SystemsDescription({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../photos/logo.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <TouchableOpacity onPress={() => navigation.navigate("LBManagement")}>
        <Image
          source={require("../photos/LBManagement.png")}
          style={styles.systemLB}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("EnetSmartHome")}>
        <Image
          source={require("../photos/eNetSmartHome.png")}
          style={styles.systemEnet}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("JungHome")}>
        <Image
          source={require("../photos/JungHome.png")}
          style={styles.systemJung}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Knx")}>
        <Image
          source={require("../photos/KNXSystem.png")}
          style={styles.systemKnx}
        />
      </TouchableOpacity>
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
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  systemLB: {
    width: 360,
    height: 50,
    marginRight: 25,
    marginBottom: 25,
  },
  systemEnet: {
    width: 350,
    height: 50,
    marginBottom: 25,
  },
  systemJung: {
    width: 350,
    height: 50,
    marginBottom: 25,
  },
  systemKnx: {
    width: 180,
    height: 47,
    marginBottom: 25,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 10,
  },
  line2: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 120,
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
