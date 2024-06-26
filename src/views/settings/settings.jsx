
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useAuth } from '../../helper/AuthContext';

const SettingsScreen = () => {
  // const { userData, logout } = useAuth(); // Aquí asumo que `useAuth` te proporciona los datos del usuario y el método `logout`

  const handleLogout = () => {
    // Aquí deberías implementar la lógica para cerrar sesión
    // logout(); // Ejemplo básico de cómo podría ser tu función de logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>prueba</Text>
        <Text style={styles.label}>Correo electrónico:</Text>
        <Text>correo@algo.com</Text>
        {/* Agrega más información del usuario según tu modelo de datos */}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
