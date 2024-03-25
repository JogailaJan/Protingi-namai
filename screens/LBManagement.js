import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LBManagement() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../photos/LB-Management.png")}
        style={styles.logo}
      />
      <View style={styles.line}></View>
      <Text style={styles.description}>
        LB-Management – naujoji apšvietimo intensyvumo ir žaliuzių valdymo
        sistema. Privačiuose statiniuose pagal poreikį valdoma apšvietimo ir
        žaliuzių sistema užtikrina didesnį komfortą ir energijos vartojimo
        efektyvumą. „Clever Config“ programėlė. Šia programėle universalus
        „Bluetooth“ laikmatis, universalus sieninis judesio jutiklis ir lubinis
        būvio jutiklis nustatomi ir valdomi išmaniuoju telefonu: patogus
        funkcijų valdymas, rodmenų ir būsenos rodymas, laikmačio ir tokių
        parametrų, kaip išjungimo vėlinimas ir šviesumas, nustatymas. Ryšys tarp
        programėlės ir LB-Management įrangos užmezgamas per „Bluetooth Low
        Energy“. Po sėkmingo nuskaitymo aptikti prietaisai parodomi sąraše ir
        atitinkama prietaiso konfigūracija gali būti perkelta į programėlę.
        Susieti prietaisai gali būti priskirti patalpoms, jiems gali būti
        suteiktas vardas, kuris valdymą padaro aiškesnį.
      </Text>
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
    width: "100%",
    height: 225,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 20,
  },
  line: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
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
