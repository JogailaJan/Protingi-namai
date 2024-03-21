import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SmartHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../photos/smart.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          Išmanieji namai tai namai, kuriuose visi arba daugelis įrenginių yra
          sujungti į vieną sistemą ir tarpusavyje sąveikauja viena kalba. Jei
          tarp programėlių valdančių jūsų įrenginį nėra jokio ryšio, tokiu
          atveju technologijos gali dar labiau varginti nei padėti. Būtent todėl
          išmaniųjų įrenginių tarpusavio sąsaja yra esminis požymis, kad namo
          įrenginiai ir sistemos sudaro išmaniojo namo visumą. Išmaniųjų namų
          technologijos apima klimato valdymą, apšvietimo valdymą, langų ir
          žaliuzių valdyma, saugos sistemų valdymą, komforto įrangos valdymą,
          energijos šaltinių valdymą ir kitas funkcijas.
        </Text>
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
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1, // Užtikrina, kad scrollView užimtų visas likusias prieinamas erdves
    width: "100%",
  },
  line: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  line2: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 40,
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
