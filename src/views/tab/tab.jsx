import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import HomeScreen from '../home/HomeScreen'; // Importa el componente HomeScreen
import SettingsScreen from '../settings/settings'; // Asegúrate de tener este componente
// import ProfileScreen from '../perfil/perfil'; // Asegúrate de tener este componente
import Scanner from '../scanner/scanner'; // Asegúrate de tener este componente
import Menu from "../drawer/menu";
import ConcertList from '../eventos/eventos';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mas') {
            iconName = focused ? 'qr-code' : 'qr-code';
          } else if (route.name === 'Eventos') {
            iconName = focused ? 'person' : 'person-outline';
          } else if(route.name === 'QR Scanner'){
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Eventos" component={ConcertList} />
      <Tab.Screen name="QR Scanner" component={Scanner} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      <Tab.Screen name="Mas" component={Menu} />
    </Tab.Navigator>
  );
}

export default MyTabs;
