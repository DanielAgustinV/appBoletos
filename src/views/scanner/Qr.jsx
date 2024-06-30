// import React, { useState } from 'react';
// import { View, Text ,Alert} from 'react-native';
// import { Button, Dialog } from '@rneui/themed';
// import styles from '../../styles/styles';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import axios from 'react-native-axios';
// import {obtener} from '../../helper/storage';


// function QRscanner() {
//     const [qrValue, setQrValue] = useState('');
//     const [light, setLight] = useState(false);
//     const [showDialog, setShowDialog] = useState(false);

//     const handleScan = (e) => {
//         const decodedValue = atob(e.data); // Decodificar base64
//         setQrValue(decodedValue);
//         setShowDialog(true);
//         sendData(decodedValue); // Enviar datos al servicio
//     };

//     const sendData = async (data) => {
//         token = obtener('token')
//         console.log('URL');
//         console.log(data);
//         try {
//             const response = await axios.put(`${data}`, {
//               id_usuario: '1',
//               token: token,
//             });
      
//             if (response.status === 200) {
//               Alert.alert('Éxito', 'Usuario actualizado correctamente');
//             } else {
//               Alert.alert('Error', 'No se pudo actualizar el usuario');
//             }
//           } catch (error) {
//             Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
//             console.error(error);
//           } finally {
//             // setLoading(false);
//           }
//     };

//     return (
//         <View style={styles.container}>
//             <QRCodeScanner
//                 ref={(node) => { this.scanner = node }}
//                 onRead={handleScan}
//                 flashMode={light ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
//                 topContent={<></>}
//                 bottomContent={
//                     <Button
//                         title={`Flash ${light ? 'OFF' : 'ON'}`}
//                         icon={{ ...styles.iconButtonHome, size: 20, name: 'qr-code-scanner' }}
//                         iconContainerStyle={styles.iconButtonHomeContainer}
//                         titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
//                         buttonStyle={{ ...styles.buttonHome, height: 50 }}
//                         containerStyle={{ ...styles.buttonHomeContainer, marginTop: 20, marginBottom: 10 }}
//                         onPress={() => { setLight(!light) }}
//                     />
//                 }
//             />
//             <View style={styles.overlay}>
//           <Text style={styles.scanText}>Escanee el código QR</Text>
//         </View>
//             {/* <Dialog
//                 isVisible={showDialog}
//                 onBackdropPress={() => setShowDialog(!showDialog)}>
//                 <Dialog.Title titleStyle={{ color: '#000', fontSize: 25 }} title="Scanned QR:" />
//                 <Text style={{ color: '#000', fontSize: 25 }}>
//                     {qrValue}
//                 </Text>
//                 <Dialog.Actions>
//                     <Dialog.Button title="Scan Again" onPress={() => {
//                         this.scanner.reactivate();
//                         setShowDialog(false);
//                     }} />
//                 </Dialog.Actions>
//             </Dialog> */}
//         </View>
//     );
// }

// export default QRscanner;
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import styles from '../../styles/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'react-native-axios';
import { obtener } from '../../helper/storage';

function QRscanner() {
    const [qrValue, setQrValue] = useState('');
    const [light, setLight] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const isBase64 = (str) => {
        const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
        return base64Regex.test(str);
    };

    const handleScan = (e) => {
        const scannedData = e.data;
        if (isBase64(scannedData)) {
            const decodedValue = atob(scannedData); // Decodificar base64
            setQrValue(decodedValue);
            sendData(decodedValue); // Enviar datos al servicio
        } else {
            Alert.alert('Error', 'El código QR no es válido.');
        }
    };

    // const sendData = async (data) => {
    //     const config = {
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //           'Content-Type': 'application/json'
    //         }
    //       };
    //     const token = obtener('token');
    //     console.log('URL');
    //     console.log(data);
    //     try {
    //         const response = await axios.put(`${data}`, {
    //             token: token,
    //         });

    //         if (response.status === 200) {
    //             Alert.alert('Éxito', 'Usuario actualizado correctamente');
    //         } else {
    //             Alert.alert('Error', 'No se pudo actualizar el usuario');
    //         }
    //     } catch (error) {
    //         Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    //         console.error(error);
    //     }
    // };

    const sendData = async (data) => {
        const token = obtener('token'); // Obtener el token antes
        console.log(token);
        console.log(data);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        console.log(data);
        try {
            const response = await axios.get(' https://www.fasticket.mx/api/escanea_boleto/108', config); 
    
            console.log(response,data);
            return;
            if (response.status === 200) {
                Alert.alert('Éxito', 'Valido');
            } else {
                Alert.alert('Error', 'No Valido');
            }
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     Alert.alert('Error de autenticación', 'Su sesión ha expirado o no está autorizado para realizar esta acción. Por favor, vuelva a iniciar sesión.');
            //   } else {
            //     Alert.alert('Error', 'Ocurrió un error al procesar la solicitud');
            //     console.error('Error:', error);
            //   }
            // Alert.alert('Error', 'Ocurrió un error');
            console.error(error);
        }
    };
    

    return (
        <View style={styles.container}>
            <QRCodeScanner
                ref={(node) => { this.scanner = node }}
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
            {/* <Dialog
                isVisible={showDialog}
                onBackdropPress={() => setShowDialog(!showDialog)}>
                <Dialog.Title titleStyle={{ color: '#000', fontSize: 25 }} title="Scanned QR:" />
                <Text style={{ color: '#000', fontSize: 25 }}>
                    {qrValue}
                </Text>
                <Dialog.Actions>
                    <Dialog.Button title="Scan Again" onPress={() => {
                        this.scanner.reactivate();
                        setShowDialog(false);
                    }} />
                </Dialog.Actions>
            </Dialog> */}
        </View>
    );
}

export default QRscanner;


