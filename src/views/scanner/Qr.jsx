import React, { useState ,useRef} from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import styles from '../../styles/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'react-native-axios';
import { obtener } from '../../helper/storage';
import CustomAlert from '../ui/alerts';

function QRscanner() {
    const [qrValue, setQrValue] = useState('');
    const [light, setLight] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const scannerRef = useRef();
    const [alertVisible, setAlertVisible] = useState(true);
    const [responsemensaje, setResponsemensaje] = useState(null);
    const [responsesuccess, setResponsesuccess] = useState(true);
    const [icon, setIcon] = useState(true);

    const closeAlert = () => {
      scannerRef.current.reactivate();
      setAlertVisible(false);         
    };
    const options = [
      { text: 'Aceptar', onPress: closeAlert },
    ];

    const isBase64 = (str) => {
        const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
        return base64Regex.test(str);
    };

    const handleScan = (e) => {
        const scannedData = e.data;
        if (isBase64(scannedData)) {
            const decodedValue = atob(scannedData); // Decodificar base64
            setQrValue(decodedValue);
            enviaQr(decodedValue); // Enviar datos al servicio
        } else {
            Alert.alert('Error', 'El código QR no es válido.');
        }
    };
    const enviaQr = async (url) => {

      let nuevaUrl = url.replace('https://', 'http://');
      // console.log(nuevaUrl);
        try {
          const token = await obtener('token');
          if (!token) {
            Alert.alert('Error', 'No se pudo obtener el token');
            return;
          }
          // console.log(token);
    
          // console.log('Token:', token);
    
          const config = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ /* Aquí puedes agregar el cuerpo de la solicitud si es necesario */ })
          };
          console.log('URL QUE SRECIVO '+ ' ' + `${nuevaUrl}`);
        //   https://www.fasticket.mx/api/escanea_boleto/10
    
          // const x = 'http://www.fasticket.mx/api/escanea_boleto/108';
          // console.log('Configuración de la solicitud:', config);
    
          // console.log('URL QUE JALA'+x);
          // const response = await fetch('htts://www.fasticket.mx/api/escanea_boleto/108', config); // Cambiado a HTTP
          const response = await fetch(`${nuevaUrl}`, config); // Cambiado a HTTP
          // console.log('Estado de la respuesta:', response.status);
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const data = await response.json();
          // console.log('Response:', data.success);
          // console.log(data.mensaje);
          if (response.status === 200) {
            // console.log('ENTROOO');
      // scannerRef.current.reactivate();

            setResponsemensaje(data.mensaje);
            setResponsesuccess(false)
            setIcon(data.success);

            // setAlertVisible(true);

            // Alert.alert('Éxito', data.mensaje, [
            //     { text: 'OK', onPress: () => scannerRef.current.reactivate() }
            //   ]);
          } else {

            setResponsemensaje(data.mensaje);
            setResponsesuccess(data.success);
            setIcon(data.success);

            // setAlertVisible(true);

            // Alert.alert('Error', data.mensaje, [
            //     { text: 'OK', onPress: () => scannerRef.current.reactivate() }
            //   ]);
          }
          setAlertVisible(true);

        } catch (error) {
          console.error('Error:', error.message);
          if (error.message.includes('Network request failed')) {
            setResponsemensaje('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
            setResponsesuccess(false)
            setAlertVisible(true);
            scannerRef.current.reactivate();

            // Alert.alert('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
          } else if (error.response && error.response.status === 401) {
            Alert.alert('Error de autenticación', 'Su sesión ha expirado o no está autorizado para realizar esta acción. Por favor, vuelva a iniciar sesión.');
          } else {
            Alert.alert('Error', 'Ocurrió un error al procesar la solicitud');
            console.error('Error respuesta servicio:', error);
          }
        }
      };
      
    

    return (
        <View style={styles.container}>
            <QRCodeScanner
                ref={scannerRef}
                onRead={handleScan}
                flashMode={light ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
                topContent={<></>}
                bottomContent={
                    <Button
                        title={`Flash ${light ? 'OFF' : 'ON'}`}
                        icon={{ ...styles.iconButtonHome, size: 20, name: 'qr-code-scanner' }}
                        iconContainerStyle={styles.iconButtonHomeContainer}
                        titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                        buttonStyle={{ ...styles.buttonHome, height: 50 }}
                        containerStyle={{ ...styles.buttonHomeContainer, marginTop: 20, marginBottom: 10 }}
                        onPress={() => { setLight(!light) }}
                    />
                }
            />
            <View style={styles.overlay}>
                <Text style={styles.scanText}>Escanee el código QR</Text>
            </View>
            <View>
              {!responsesuccess && (
                <CustomAlert
                  visible={alertVisible}
                  icon={icon ?'check' : 'error' }
                  title={icon ? 'Éxito' : 'Error..'}
                  message={responsemensaje}
                  options={options}
                  onClose={closeAlert}
                />
              )}
          </View>
        </View>
    );
}

export default QRscanner;


