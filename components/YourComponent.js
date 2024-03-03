import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import db from '../backend/Database'; // Import the database connection

const YourComponent = () => {
  const [alphabetData, setAlphabetData] = useState([]);

  useEffect(() => {
    // Fetch data from the alphabet table
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM alphabet',
        [],
        (_, { rows }) => {
          // Extract rows from the result set
          const data = rows.raw();
          setAlphabetData(data);
        },
        error => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <View>
      <Text>Alphabet List:</Text>
      {alphabetData.map(item => (
        <Text key={item.id}>{item.letter}</Text>
      ))}
    </View>
  );
};

export default YourComponent;
