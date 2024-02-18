import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function AreasDescription() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>{/* Paslepia laika ir visas kitas piktogramas telefono virsuje */}
      <Button title="Smart Home" onPress={() => console.log("Button1 pressed")}/>
      <Button title="Systems Description" onPress={() => console.log("Button2 pressed")}/>
      <Button title="Areas Description" onPress={() => console.log("Button3 pressed")}/>
      <Button title="Questionnaire" onPress={() => console.log("Button4 pressed")}/>
      <Button title="Favorites" onPress={() => console.log("Button5 pressed")}/>
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
