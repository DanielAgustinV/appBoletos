import React from 'react';
import { View, Button, Alert } from 'react-native';
import { obtener } from '../helper/storage';
import { longPressGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';

const MyButtonComponent = () => {

  const handlePress = async () => {
    try {
      const token = await obtener('token'); // Asegúrate de que 'obtener' devuelva una promesa
      if (!token) {
        Alert.alert('Error', 'No se pudo obtener el token');
        return;
      }
      console.log(token);

      console.log('Token:', token);

      const config = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ /* Aquí puedes agregar el cuerpo de la solicitud si es necesario */ })
      };

      console.log('Configuración de la solicitud:', config);

      const response = await fetch('http://www.fasticket.mx/api/escanea_boleto/108', config); // Cambiado a HTTP
      console.log('Estado de la respuesta:', response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response:', data.success);
      console.log(data.mensaje);
      if (response.status === 200) {
        Alert.alert('Éxito',data.mensaje);
      } else {
        Alert.alert('Error',data.mensaje);
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error.message.includes('Network request failed')) {
        Alert.alert('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
      } else if (error.response && error.response.status === 401) {
        Alert.alert('Error de autenticación', 'Su sesión ha expirado o no está autorizado para realizar esta acción. Por favor, vuelva a iniciar sesión.');
      } else {
        Alert.alert('Error', 'Ocurrió un error al procesar la solicitud');
        console.error('Error respuesta servicio:', error);
        console.log(response.data);
        console.log('pedro');
      }
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="PETICION" onPress={handlePress} />
    </View>
  );
};

export default MyButtonComponent;
