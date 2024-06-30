import React, {useState} from 'react';
import UserProfile from '../perfil/user';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomAlert from '../ui/alerts';
import {obtener} from '../../helper/storage';


const Perfil = ({navigation}) => {

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
  navigation.replace('Login');
  setAlertVisible(false);

};
const options = [
  { text: 'Aceptar', onPress: CerrarSesion },
  { text: 'Cancelar', onPress: handleCloseAlert },
];

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.logoutButton} onPress={Alerta}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: '#666666',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Perfil;

