// En tu archivo HomeScreen.js
import React from 'react';
import { View ,Text} from 'react-native';
import MyTabs from '../tab/tab'; // Ajusta la ruta según la ubicación real de tu archivo MyTabs
import { Button } from '@rneui/themed';
import styles from '../../styles/styles'

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MyTabs /> 
    </View>
  );
}
