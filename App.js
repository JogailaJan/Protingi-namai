import { Text, View } from "react-native";
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
  dropAllTables();
  useEffect(() => {
    const initializeDatabase = async () => {
      const tablesExist = await checkIfTablesExist();
      if (!tablesExist) {
        await createAllTables();
        await insertDataToAllTables();
      } else {
        console.log("Tables already exist.");
      }
      const tableNames = await getTableNames();
      console.log("Table Names:", tableNames);
      // updateSystems();
    };

    initializeDatabase();
  }, []);


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
