import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Questionnaire() {
  return (
    <View style={styles.container}>
      <StatusBar hidden/>{/* Paslepia laika ir visas kitas piktogramas telefono virsuje */}
      <Button title="Button1" onPress={() => console.log("Button1 pressed")}/>
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
