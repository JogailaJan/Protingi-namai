import { Text, View, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import QuestionnaireScreen from "./screens/Questionnaire";
import SmartHomeScreen from "./screens/SmartHome";
import SystemsDescriptionScreen from "./screens/SystemsDescription";
import AreasDescriptionScreen from "./screens/AreasDescription";
import FavoritesScreen from "./screens/Favorites";
import LBManagementScreen from "./screens/LBManagement";
import EnetSmartHomeScreen from "./screens/EnetSmartHome";
import KnxScreen from "./screens/Knx";
import JungHomeScreen from "./screens/JungHome";
import {
  fetchSystemsData,
  getTableNames,
  checkIfTablesExist,
  dropAllTables,
  createAllTables,
  insertDataToAllTables
} from "./backend/Database";
// import { updateSystems } from "./backend/Systems/Functions";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  //dropAllTables();
  useEffect(() => {
    const initializeDatabase = async () => {
      // ... database operations
      try {
        //await dropAllTables();
        const tablesExist = await checkIfTablesExist();
        if (!tablesExist) {
          await createAllTables();
          await insertDataToAllTables();
        }
        const tableNames = await getTableNames();
        console.log("Table Names:", tableNames);
      } catch (error) {
        console.error("Database error:", error);
        // Handle errors appropriately, e.g., display an error message
      } finally {
        //setIsLoading(false); // Set loading to false after completion or errors
      }
    };

    initializeDatabase()
    .then(() => setIsLoading(false)) // Update state after successful completion
    .catch((error) => console.error(error));
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require("./photos/logo.png")} style={styles.logo} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Išmanūs Namai",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          options={{
            title: "Klausimynas",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Smart Home"
          component={SmartHomeScreen}
          options={{
            title: "Išmanūs Namai",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Systems Description"
          component={SystemsDescriptionScreen}
          options={{
            title: "Sistemų Aprašymai",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Areas Description"
          component={AreasDescriptionScreen}
          options={{
            title: "Sričių Aprašymai",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: "Mėgstamiausi",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="LBManagement"
          component={LBManagementScreen}
          options={{
            title: "LB-Management",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="EnetSmartHome"
          component={EnetSmartHomeScreen}
          options={{
            title: "eNet Smart Home",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Knx"
          component={KnxScreen}
          options={{
            title: "KNX",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="JungHome"
          component={JungHomeScreen}
          options={{
            title: "JUNG HOME",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});
