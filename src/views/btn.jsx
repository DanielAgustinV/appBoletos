// import React from 'react';
// import { View, Button, Alert } from 'react-native';
// import { obtener } from '../helper/storage';
// import { longPressGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';

// const MyButtonComponent = () => {

//   const handlePress = async () => {
//     try {
//       const token = await obtener('token'); // Asegúrate de que 'obtener' devuelva una promesa
//       if (!token) {
//         Alert.alert('Error', 'No se pudo obtener el token');
//         return;
//       }
//       console.log(token);

//       console.log('Token:', token);

//       const config = {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         // body: JSON.stringify({ /* Aquí puedes agregar el cuerpo de la solicitud si es necesario */ })
//       };

//       console.log('Configuración de la solicitud:', config);

//       const response = await fetch('http://www.fasticket.mx/api/escanea_boleto/108', config); // Cambiado a HTTP
//       console.log('Estado de la respuesta:', response.status);

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Response:', data.success);
//       console.log(data.mensaje);
//       if (response.status === 200) {
//         Alert.alert('Éxito',data.mensaje);
//       } else {
//         Alert.alert('Error',data.mensaje);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       if (error.message.includes('Network request failed')) {
//         Alert.alert('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
//       } else if (error.response && error.response.status === 401) {
//         Alert.alert('Error de autenticación', 'Su sesión ha expirado o no está autorizado para realizar esta acción. Por favor, vuelva a iniciar sesión.');
//       } else {
//         Alert.alert('Error', 'Ocurrió un error al procesar la solicitud');
//         console.error('Error respuesta servicio:', error);
//         console.log(response.data);
//         console.log('pedro');
//       }
//     }
//   };
  

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="PETICION" onPress={handlePress} />
//     </View>
//   );
// };

// export default MyButtonComponent;

import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanner = () => {
  const [qrRead, setQrRead] = useState(false);
  const [light, setLight] = useState(false); // Ajusta según tu lógica para manejar el flash
  const scannerRef = useRef(null);

  const handleScan = (e) => {
    if (!qrRead) {
      setQrRead(true);
      console.log('QR code detected:', e.data);
      // Lógica adicional si es necesario
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        ref={scannerRef}
        onRead={handleScan}
        flashMode={light ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
        cameraStyle={styles.camera}
        rectOfInterest={{
          x: 0.2, // Coordenadas de la esquina superior izquierda de la región de interés
          y: 0.4,
          width: 0.6, // Ancho y alto de la región de interés (proporcional al tamaño de la cámara)
          height: 0.2,
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.box}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: '30%', // Alto del cuadro (proporcional al tamaño del contenedor)
    width: '60%',  // Ancho del cuadro (proporcional al tamaño del contenedor)
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default QRScanner;
