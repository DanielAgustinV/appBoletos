import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para guardar el token en AsyncStorage
export const guardar = async (name ,token) => {
  try {
    await AsyncStorage.setItem(name, token);
    // console.log(token + ' guardado correctamente en el almacenamiento local.');
  } catch (error) {
    console.error('Error al guardar el token:', error);
    throw error;
  }
};

// Función para obtener el token desde AsyncStorage
export const obtener = async (name) => {
  try {
    const token = await AsyncStorage.getItem(name);
    if (token) {
      //  console.log('Se recupero desde el almacenamiento local:', token);
      return token;
    } else {
      // console.log('No se encontró ' + token + ' en el almacenamiento local.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
    throw error;
  }
};
