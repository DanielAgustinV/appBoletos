import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/final1.jpeg')} 
        style={styles.image} 
      />
      <Text style={styles.text}>Bienvenido</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default WelcomeScreen;
