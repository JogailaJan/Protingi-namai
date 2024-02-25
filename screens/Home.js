import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Išmanieji namai" onPress={() => navigation.navigate("Smart Home")}/>
      <Button title="Sistemų aprašymai" onPress={() => navigation.navigate("Systems Description")}/>
      <Button title="Paslaugų aprašymai" onPress={() => navigation.navigate("Areas Description")}/>
      <Button title="Klausimynas" onPress={() => navigation.navigate("Questionnaire")}/>
      <Button title="Išsaugotos konfigūracijos" onPress={() => navigation.navigate("Favorites")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
