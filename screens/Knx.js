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
      <Image source={require("../photos/KNX.png")} style={styles.logo} />
      <View style={styles.line}></View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          KNX – atviras pasaulinis namų ir pastatų valdymo ir automatizavimo
          standartas. KNX yra patvirtintas kaip Europos standartas (CENELEC EN
          50090 ir CEN EN 13.321-1), tarptautinis standartas (ISO/IEC 14.543-3),
          Kinijos standartas (GB/T 20965), JAV standartas (ANSI/ ASHRAE 135).
          Šis standartas grindžiamas EIB/instabus, EHS, BatiBUS standartais. KNX
          standartą oficialiai pripažįsta ir naudoja net 424 gamintojai 44
          valstybėse bei daugiau nei 70 000 partnerių 163 šalyse. KNX sistemoje
          visi davikliai sujungiami į vieną bendrą sistemą KNX kabeliu, o
          įrenginiai maitinami prijungiant prie elektros tinklo. Šioje sistemoje
          vienas daviklis gali būti naudojamas kelioms sistemoms (pvz., laiko
          daviklis – apšvietimui ir žaliuzėms valdyti). Išmanieji namai valdo
          skirtingas namo funkcijas naudodami skirtingus valdymo elementus,
          susijungiančius į vientisą KNX sistemą ir veikiančius sinergijos
          principu. Kad namo sistemos taptų automatizuotos ir veiktų pagal iš
          anksto suprogramuotus algoritmus, visos inžinerinės sistemos turi
          turėti bendrą sujungimo protokolą, kuris apjungia sistemas ir leidžia
          pasiekti sinergiją. Todėl, jei norima turėti išmaniuosius namus,
          reikia apsispręsti konkrečiame būsto projektavimo etape, kai rengiamas
          architektūrinis ir inžinerinis pastato projektas.
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
