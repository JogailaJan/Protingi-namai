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

export default function EnetSmartHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../photos/eNet.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          Ši sistema yra idealus sprendimas, norint suteikti daugiau komforto ir
          saugumo savo namuose ar mažesniuose biuruose, taip pat ne tik naujuose
          pastatuose, bet ir pastatų renovacijos metu. „eNet“ radijo bangomis
          valdoma sistema užpildo nišą tarp standartinės instaliacijos sistemų,
          kur visi prietaisai prijungti maitinimo kabeliu, ir išmaniųjų pastatų
          sistemų. Naudojant „eNet SMART HOME“ programėlę, galima įjungti ir
          valdyti pastato funkcijas išmaniuoju telefonu, esant vietoje ar per
          nuotolį. „eNet“ – tai vientisas dizainas, sistema sumontuojama
          pastate, yra patvari, patikima, diegiama profesionalų. Sistema
          intuityviai valdoma ant sienos sumontuotu siųstuvu ar išmaniąja
          programėle. Įvairių gamintojų prietaisai gali būti sujungiami į
          vientisą tinklą, vartotojas gali lengvai konfigūruoti sistemą. Galimas
          valdymas balsu su „Amazon Alexa“ ir „Goggle Assistant“. Įdiegiama
          greitai ir paprastai. Kadangi sieniniai siųstuvai klijuojami ant
          norimo paviršiaus, jungiklius galima sumontuoti ten, kur reikia.
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
    width: 180,
    height: 120,
    marginBottom: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 20,
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
    marginBottom: 60,
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
