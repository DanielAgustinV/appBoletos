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
// import Boletos from '../scanner/boletos';
import btn from '../btn'
import WelcomeScreen from '../home/Welcome'
import Boletos from '../scanner/boletos'
import Descargas from '../boletos_descargados';



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mas') {
            iconName = focused ? 'menu-open' : 'menu';
          } else if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'QR Scanner') {
            iconName = focused ? 'qr-code-scanner' : 'qr-code-scanner';
          } else if (route.name === 'Boletos'){
            iconName = focused ? 'download' : 'cloud-download';
          }

          // Retorna el icono correspondiente
          return <Icon name={iconName} size={size} color={color} />;
          // return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0303b5',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Inicio" component={WelcomeScreen} />
      <Tab.Screen name="QR Scanner" component={Qr} />
      <Tab.Screen name="Boletos" component={Boletos} />
      <Tab.Screen name="Mas" component={Menu} />
      <Tab.Screen name="Descargas" component={Descargas} />
    </Tab.Navigator>
  );
}

export default MyTabs;

