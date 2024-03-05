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

export default function Knx() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../photos/JUNG home.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          JUNG HOME prietaisai sujungiami į tinklą naudojant „Bluetooth® SIG
          Mesh“. Ši technologija leidžia sukurti decentralizuotą belaidį tinklą,
          kuriame duomenų perdavimas, dėl naudojamo automatinio šifravimo, yra
          ypač saugus. JUNG HOME prietaisai, pvz., mygtukai ir kištukiniai
          lizdai, vienu metu gali veikti kaip siųstuvai ir imtuvai. Jie palaiko
          tarpusavio ryšį naudodami aukšto lygio šifravimą (AES-128).
          Perduodamos komandos tinkle keliauja iš prietaiso į prietaisą, kol
          pasiekia tikslą. Tai leidžia palaikyti ryšį už tiesioginės belaidžio
          ryšio aprėpties ribų. „Bluetooth Mesh“ veikia be interneto ir serverio
          prieigos, todėl duomenys lieka tinklo viduje. JUNG HOME yra lanksti
          pastato valdymo sistema. Tai reiškia, kad sistemą galima lengvai
          išplėsti prijungiant naujas patalpas ar pastato aukštus bei papildomas
          funkcijas. Todėl šią sistemą galima įdiegti tiek mažesniuose, tiek ir
          didesniuose pastatuose. Sistemos konfigūravimui nereikia interneto
          prieigos, prietaisai tarpusavyje susiejami naudodami išmanųjį telefoną
          ir programėlę JUNG HOME. JUNG HOME integravimas į gamintojų tinklą
          „WORKS WITH mediola®“ atveria naudotojams daugybę papildomų galimybių
          prisijungti prie daiktų interneto pasaulio – daugelį buities prietaisų
          galima valdyti JUNG HOME mygtukais. JUNG HOME sistemą sujungus su
          „Amazon Alexa“ arba „Google Assistant“, atsiranda galimybė visus JUNG
          HOME prietaisus ir prie sistemos prijungtus kitų prekių ženklų
          gamintojų išmaniuosius sprendimus valdyti balsu. Be to, naudojantis
          programėlėmis „Amazon Alexa“ arba „Google Assistant“, JUNG HOME
          sistemą galima valdyti ir internetu.
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
