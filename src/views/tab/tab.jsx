import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../settings/settings'; // Asegúrate de tener este componente
import Scanner from '../scanner/scanner'; // Asegúrate de tener este componente
import Menu from '../drawer/menu';
import ConcertList from '../eventos/eventos';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from '../scanner/QrScanner';
import Qr from '../scanner/Qr'
import Boletos from '../scanner/boletos';
import btn from '../btn'



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mas') {
            iconName = focused ? 'menu-open' : 'menu';
          } else if (route.name === 'Eventos') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'QR Scanner') {
            iconName = focused ? 'qr-code-scanner' : 'qr-code-scanner';
          } else if (route.name === 'QR'){
            iconName = focused ? 'qr-code-scanner' : 'cloud-download';
          }

          // Retorna el icono correspondiente
          return <Icon name={iconName} size={size} color={color} />;
          // return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgba(255, 193, 7, 1)',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Eventos" component={ConcertList} />
      <Tab.Screen name="QR Scanner" component={Qr} />
      <Tab.Screen name="QR" component={btn} />
      <Tab.Screen name="Mas" component={Menu} />
    </Tab.Navigator>
  );
}

export default MyTabs;

