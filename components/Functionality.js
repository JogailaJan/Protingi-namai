import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Functionality() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>{/* Paslepia laika ir visas kitas piktogramas telefono virsuje */}
      <Button title="Button1" onPress={() => console.log("Button1 pressed")}/>
      <Button title="Button2" onPress={() => console.log("Button2 pressed")}/>
      <Button title="Button3" onPress={() => console.log("Button3 pressed")}/>
      <Button title="Button4" onPress={() => console.log("Button4 pressed")}/>
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
