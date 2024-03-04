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
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
// expo add expo-sqlite

export default function App() {
  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentname] = useState(undefined);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM names', null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading names...</Text>
      </View>
    );
  }

  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}</Text>
        </View>
      );
    })
  };

  const addName = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO names (name) values (?)', [currentName],
        (txObj, resultSet) => {
          let existingNames = [...names];
          existingNames.push({ id: resultSet.insertId, name: currentName});
          setNames(existingNames);
          setCurrentname(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
  <View style={styles.container}>
    <TextInput value={currentName} placeholder="name" onChangeText={setCurrentname}/>
    <Button title="Add name" onPress={addName}/>
    {showNames()}
    <StatusBar style="auto" />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});                    
