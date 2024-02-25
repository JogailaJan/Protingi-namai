import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import QuestionnaireScreen from "./screens/Questionnaire";
import SmartHomeScreen from "./screens/SmartHome";
import SystemsDescriptionScreen from "./screens/SystemsDescription";
import AreasDescriptionScreen from "./screens/AreasDescription";
import FavoritesScreen from "./screens/Favorites";

const Stack = createNativeStackNavigator();
const starEmpty = require("./star-empty.png");


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Pagrindinis',
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <Stack.Screen 
          name="Questionnaire" 
          component={QuestionnaireScreen} 
          options={{ 
            title: 'Klausimynas',
            headerStyle: { backgroundColor: 'green' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <Stack.Screen name="Smart Home" component={SmartHomeScreen} options={{ title: 'Išmanieji namai' }} />
        <Stack.Screen name="Systems Description" component={SystemsDescriptionScreen} options={{ title: 'Sistemų aprašymai' }} />
        <Stack.Screen name="Areas Description" component={AreasDescriptionScreen} options={{ title: 'Paslaugų aprašymai' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Išsaugotos konfigūracijos' }} />
      </Stack.Navigator>
    </NavigationContainer>                                                                            
  );
}