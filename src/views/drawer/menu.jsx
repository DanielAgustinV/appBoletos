import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MenuItem = ({ icon, label, route }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const Alerta = () => {
    setAlertVisible(true);
};

  const navigation = useNavigation();

  const handlePress = () => {
    if(route == 'salir'){
      console.log('cerrar secion');
      Alerta();
      // return
    }else{
      navigation.navigate(route);
    }
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      {/* Puedes usar un icono aquí si lo deseas */}
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerMenu = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const Alerta = () => {
    setAlertVisible(true);
};

const handleCloseAlert = () => {
  setAlertVisible(false);
};

const CerrarSesion = () => {
  logout('Login');
  navigation.replace('Login');
  setAlertVisible(false);

};
const options = [
  { text: 'Aceptar', onPress: CerrarSesion },
  { text: 'Cancelar', onPress: handleCloseAlert },
];
  return (
    <View style={styles.container}>
      <MenuItem icon="" label="Perfil" route="Perfil" />
      <MenuItem icon="🏠" label="Inicio" route="Home" />
      <MenuItem icon="📁" label="Archivos" route="Files" />
      <MenuItem icon="📝" label="Notas" route="Notes" />
      {/* Agrega más elementos MenuItem según tus necesidades */}

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
  },
});

export default CustomDrawerMenu;
