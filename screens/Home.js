import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Smart Home" onPress={() => navigation.navigate("Smart Home")}/>
      <Button title="Systems Description" onPress={() => navigation.navigate("Systems Description")}/>
      <Button title="Areas Description" onPress={() => navigation.navigate("Areas Description")}/>
      <Button title="Questionnaire" onPress={() => navigation.navigate("Questionnaire")}/>
      <Button title="Favorites" onPress={() => navigation.navigate("Favorites")}/>
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
