// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button} from 'react-native';

// export default function Home({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Button title="Išmanieji namai" onPress={() => navigation.navigate("Smart Home")}/>
//       <Button title="Sistemų aprašymai" onPress={() => navigation.navigate("Systems Description")}/>
//       <Button title="Paslaugų aprašymai" onPress={() => navigation.navigate("Areas Description")}/>
//       <Button title="Klausimynas" onPress={() => navigation.navigate("Questionnaire")}/>
//       <Button title="Išsaugotos konfigūracijos" onPress={() => navigation.navigate("Favorites")}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useEffect } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     Alert,
//     TextInput,
// } from 'react-native';
// import CustomButton from './CustomButton.';
// import GlobalStyle from './GlobalStyle';
// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//     },
//     () => { },
//     error => { console.log(error) }
// );

// export default function Home({ navigation, route }) {

//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');

//     useEffect(() => {
//         getData();
//     }, []);

//     const getData = () => {
//         try {
//             // AsyncStorage.getItem('UserData')
//             //     .then(value => {
//             //         if (value != null) {
//             //             let user = JSON.parse(value);
//             //             setName(user.Name);
//             //             setAge(user.Age);
//             //         }
//             //     })
//             db.transaction((tx) => {
//                 tx.executeSql(
//                     "SELECT Name, Age FROM Users",
//                     [],
//                     (tx, results) => {
//                         var len = results.rows.length;
//                         if (len > 0) {
//                             var userName = results.rows.item(0).Name;
//                             var userAge = results.rows.item(0).Age;
//                             setName(userName);
//                             setAge(userAge);
//                         }
//                     }
//                 )
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const updateData = async () => {
//         if (name.length == 0) {
//             Alert.alert('Warning!', 'Please write your data.')
//         } else {
//             try {
//                 // var user = {
//                 //     Name: name
//                 // }
//                 // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
//                 db.transaction((tx) => {
//                     tx.executeSql(
//                         "UPDATE Users SET Name=?",
//                         [name],
//                         () => { Alert.alert('Success!', 'Your data has been updated.') },
//                         error => { console.log(error) }
//                     )
//                 })
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }

//     const removeData = async () => {
//         try {
//             // await AsyncStorage.clear();
//             db.transaction((tx) => {
//                 tx.executeSql(
//                     "DELETE FROM Users",
//                     [],
//                     () => { navigation.navigate('Login') },
//                     error => { console.log(error) }
//                 )
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <View style={styles.body}>
//             <Text style={[
//                 GlobalStyle.CustomFont,
//                 styles.text
//             ]}>
//                 Welcome {name} !
//             </Text>
//             <Text style={[
//                 GlobalStyle.CustomFont,
//                 styles.text
//             ]}>
//                 Your age is {age}
//             </Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder='Enter your name'
//                 value={name}
//                 onChangeText={(value) => setName(value)}
//             />
//             <CustomButton
//                 title='Update'
//                 color='#ff7f00'
//                 onPressFunction={updateData}
//             />
//             <CustomButton
//                 title='Remove'
//                 color='#f40100'
//                 onPressFunction={removeData}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 40,
//         margin: 10,
//     },
//     input: {
//         width: 300,
//         borderWidth: 1,
//         borderColor: '#555',
//         borderRadius: 10,
//         backgroundColor: '#ffffff',
//         textAlign: 'center',
//         fontSize: 20,
//         marginTop: 130,
//         marginBottom: 10,
//     }
// })
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

const db = SQLite.openDatabase('test1.db');

const CREATE_TABLE_SYSTEMS = `
  CREATE TABLE IF NOT EXISTS Systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT
  );
`;

const INSERT_SYSTEMS_DATA = `
  INSERT INTO Systems (name, link, description) VALUES 
  ('LB MANAGEMENT', 'http://system1', ''),
  ('eNet SMART HOME', 'http://system2', ''),
  ('KNX SMART VISU SERVER', 'http://system3', ''),
  ('KNX VISU PRO SERVER', 'http://system4', '');
`;

export default function App() {
  const [systems, setSystems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const executeQueries = async () => {
      try {
        // Begin transaction
        await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              CREATE_TABLE_SYSTEMS,
              [],
              () => resolve(),
              (_, error) => reject(error)
            );
          });
        });

        // Insert data
        await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              INSERT_SYSTEMS_DATA,
              [],
              () => resolve(),
              (_, error) => reject(error)
            );
          });
        });

        // Fetch data
        await new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Systems",
              [],
              (_, { rows }) => {
                const systemsData = rows._array;
                setSystems(systemsData);
                resolve();
              },
              (_, error) => reject(error)
            );
          });
        });

        setIsLoading(false); // Set loading to false after all operations
      } catch (error) {
        setError(error);
      }
    };

    executeQueries();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading systems...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Systems:</Text>
        {systems.map(system => (
          <View key={system.id}>
            <Text>Name: {system.name}</Text>
            <Text>Link: {system.link}</Text>
            <Text>Description: {system.description}</Text>
          </View>
        ))}
      </ScrollView>
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



