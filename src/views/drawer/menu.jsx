import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {guardar,eliminar} from '../../helper/storage';
import CustomAlert from '../ui/alerts';


const Sidebar = () => {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);

  const Alerta = () => {
    setAlertVisible(true);
};

const handleCloseAlert = () => {
  setAlertVisible(false);
};

const CerrarSesion = () => {
  // logout('Login');
  // obtener('token')
  // guardar('token','')
  // guardar('email','')
  // guardar('password','')
  eliminar('token');
  eliminar('email');
  eliminar('password');
  navigation.replace('Login');
  setAlertVisible(false);

};
const options = [
  { text: 'Aceptar', onPress: CerrarSesion },
  { text: 'Cancelar', onPress: handleCloseAlert },
];


  // Definición del array de elementos del menú
  const menuItems = [
    { name: 'Boletos Confirmados', route: 'Escaneados', icon: 'sticky-note-2' },
    // Agrega más elementos según sea necesario
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.route)}
    >
      <Icon name={item.icon} size={24} color="#000" />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.route}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={Alerta}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <View>
        {alertVisible && (
            <CustomAlert
          visible={alertVisible}
          icon={'warning'}
          title={alertVisible ? 'Atención' : 'Error..'}
          message={'Seguro que quieres cerrar sesion'}
          options={options}
          onClose={handleCloseAlert}
        />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 20,
    color: 'black'
  },
  logoutButton: {
    marginTop: 'auto',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Sidebar;


