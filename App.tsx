
import { useState } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/views/home/HomeScreen.jsx';
import Login from './src/views/login/Login.jsx';
import Menu from './src/views/drawer/menu.jsx';
import Perfil from './src/views/perfil/perfil.jsx';
import TicketDownload from './src/views/scanner/boletos.jsx'
import Qr from './src/views/scanner/QrScanner.jsx'
const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login}  />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false}}/>
        <Stack.Screen name='Ticket' component={TicketDownload} options={{ headerShown: false}}/>
        {/* <Stack.Screen name='Qr' component={Qr}/> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;