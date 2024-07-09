import React, { useState ,useRef} from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import styles from '../../styles/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'react-native-axios';
import { obtener } from '../../helper/storage';
import CustomAlert from '../ui/alerts';
import { useRoute } from '@react-navigation/native';
import { connectToDatabase, createTableIfNotExists, insertBoleto, updateBoleto, getBoletos ,clearTable} from '../../database/database';
import ApiRequest from '../../api/request';
import endponints from '../../api/endponits';
import { useNetInfo } from '@react-native-community/netinfo';
import { Icon } from 'react-native-elements';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';



function QRscanner({navigation}) {
    const [qrValue, setQrValue] = useState('');
    const [light, setLight] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const scannerRef = useRef();
    const [alertVisible, setAlertVisible] = useState(true);
    const [responsemensaje, setResponsemensaje] = useState(null);
    const [responsesuccess, setResponsesuccess] = useState(true);
    const [icon, setIcon] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [boletos, setBoletos] = useState(false);
    const netInfo = useNetInfo();


    const closeAlert = () => {
      Dialog.hide();
      scannerRef.current.reactivate();
      // setAlertVisible(false);         
    };
    const options = [
      { text: 'Aceptar', onPress: closeAlert },
    ];

    const isBase64 = (str) => {
        const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
        return base64Regex.test(str);
    };

    const handleScan = (e,flag) => {
      // console.log('ESTO ES FLAG' + flag);
      // console.log(flag);
      // const sinConexion = flag;
       console.log(flag);
        const scannedData = e.data;
        if (isBase64(scannedData)) {
            const decodedValue = atob(scannedData); // Decodificar base64
            setQrValue(decodedValue);
            enviaQr(decodedValue,flag);
             // Enviar datos al servicio
             setShowButton(flag == 1 ? false : true);
        } else {
            Alert.alert('Error', 'El código QR no es válido.');
        }
    };
    const enviaQr = async (url,flag) => {
      // console.log('esto es sla vandera para cuando no hay conexion '+ flag);
      if (flag == 0){
        console.log('Escaneo de boletos sin conexion a internet');
        const id_asiento = url.split('/').pop();
        // console.log(id_asiento);
        actualizaEstatusboleto(id_asiento);
      } else {
      let nuevaUrl = url.replace('https://', 'http://');
      // console.log(nuevaUrl);
        try {
          const token = await obtener('token');
          if (!token) {
            Alert.alert('Error', 'No se pudo obtener el token');
            scannerRef.current.reactivate();
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
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Exito',
              textBody: data.mensaje,
              button: 'Aceptar',
               closeOnOverlayTap: true,
              onPressButton:() => { closeAlert()}
            })

            // setResponsemensaje(data.mensaje);
            // setResponsesuccess(false)
            // setIcon(data.success);

            // setAlertVisible(true);

            // Alert.alert('Éxito', data.mensaje, [
            //     { text: 'OK', onPress: () => scannerRef.current.reactivate() }
            //   ]);
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: data.mensaje,
              button: 'Aceptar',
               closeOnOverlayTap: true,
              onPressButton:() => { closeAlert()}
            })
            // setResponsemensaje(data.mensaje);
            // setResponsesuccess(data.success);
            // setIcon(data.success);

            // setAlertVisible(true);

            // Alert.alert('Error', data.mensaje, [
            //     { text: 'OK', onPress: () => scannerRef.current.reactivate() }
            //   ]);
          }
          setAlertVisible(true);

        } catch (error) {
          console.error('Error:', error.message);
          if (error.message.includes('Network request failed')) {
            // setResponsemensaje('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
            // setResponsesuccess(false)
            // setAlertVisible(true);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: 'Error de red, No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.',
              button: 'Aceptar',
               closeOnOverlayTap: true,
              onPressButton:() => { closeAlert}
            })
            scannerRef.current.reactivate();

            // Alert.alert('Error de red', 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.');
          } else if (error.response && error.response.status === 401) {
            Alert.alert('Error de autenticación', 'Su sesión ha expirado o no está autorizado para realizar esta acción. Por favor, vuelva a iniciar sesión.');
          } else {
            Alert.alert('Error', 'Ocurrió un error al procesar la solicitud');
            console.error('Error respuesta servicio:', error);
          }
        }
      }
      };

      const actualizaEstatusboleto = async (id_asiento) => {
        // console.log('entra a actualizar boletos');
        // console.log(id_asiento);
        try {
          const message = await updateBoleto(id_asiento, 4);
        //   console.log(message);
      //     Alert.alert(message);
      // scannerRef.current.reactivate();
          // Alert.alert(
          //   'Exito',
          //   message,
          //   [
          //     {
          //       text: 'Cancelar',
          //       style: 'cancel',
          //     },
          //     {
          //       text: 'Aceptar',
          //       onPress: async () => {
          //         // navigation.replace('Home');
          //         scannerRef.current.reactivate();

          //       },
          //     },
          //   ],
          //   { cancelable: false }
          // );
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Exito',
            textBody: message,
            button: 'Aceptar',
             closeOnOverlayTap: true,
            onPressButton:() => {closeAlert()}
          })
          // fetchBoletos(); // Actualizar la lista de boletos después de actualizar
        } catch (error) {
        //   console.error(error);
        // Alert.alert(
        //   'Error',
        //   error,
        //   [
        //     {
        //       text: 'Cancelar',
        //       style: 'cancel',
        //     },
        //     {
        //       text: 'Aceptar',
        //       onPress: async () => {
        //         // navigation.replace('Home');
        //         scannerRef.current.reactivate();

        //       },
        //     },
        //   ],
        //   { cancelable: false }
        // );
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error..',
          textBody: error,
          button: 'Aceptar',
          closeOnOverlayTap: true,
          onPressButton:() => { closeAlert()}
        })

        }
      };

      const boletosConfirmados  = async () => {

        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Atencion',
          textBody: '¿Quieres consultar los boletos confirmados?',
          button: 'Si',
          // closeOnOverlayTap: true,
          onPressButton:() => { navigation.replace('Escaneados')}
        })
        // try {
        //   const data = await getBoletos();
        //   console.log(typeof data);
        //   setBoletos(true)
        //   console.log(data);
        //   // setBoletos(data);
        //   if(boletos){
        //     Alert.alert(
        //       'Atencion',
        //       '¿Estás seguro de cargar esta información?',
        //       [
        //         {
        //           text: 'Cancelar',
        //           style: 'cancel',
        //         },
        //         {
        //           text: 'Si,Confirmar',
        //           onPress: async () => {
        //              cargarBoletosconfirmados(data);
        //           },
        //         },
        //       ],
        //       { cancelable: false }
        //     );
        //   }
        // } catch (error) {
        //   console.error(error);
        // }
      };


      const cargarBoletosconfirmados =  async (boletos) =>{

        // console.log(data);
        // return;

        try {
        const token = await obtener('token');
        const id_usuario = await obtener('usuario');
        // console.log(id_usuario);
        // return;
        const datos= {
          id_usuario: id_usuario,
          boletos: boletos
        };
        console.log(datos);
        // return;

          // setLoading(true);
          const data = await ApiRequest( datos, endponints.cargaboletos,'POST',token);
          // const token = data.token;
          // console.log(token);
          // navigation.replace('Home');
          if(data.success == true){
            Alert.alert(
              'Exito',
              data.mensaje,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Aceptar',
                  onPress: async () => {
                    navigation.replace('Home');
                    scannerRef.current.reactivate();

                  },
                },
              ],
              { cancelable: false }
            );
            // Alert.alert('Exito',data.mensaje)
            
            
          } else if (data.success == false){
            Alert.alert(
              'Error',
              data.mensaje,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Aceptar',
                  onPress: async () => {
                    // navigation.replace('Home');
                    scannerRef.current.reactivate();

                  },
                },
              ],
              { cancelable: false }
            );

          }
        } catch (error) {

          console.error('Error al obtener datos:', error);
        }
      }
      
      const sincronizar = () =>{
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Atencion',
          textBody: '¿Quieres sincronizar nuevamente el evento?, la informacion anterior de perdera.',
          button: 'SI',
          closeOnOverlayTap: true,
          onPressButton:() => {borrarRegistros()}
        })
      }

      const borrarRegistros = async () =>{
        try {
          const message = await clearTable();
          console.log(message);
          // navigation.replace('Home');
          navigation.navigate('Home');
        } catch (error) {
          // console.error(error);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error,
          })
        }
        
      }
      const route = useRoute();
      const  flag = route.params?.flag;
      // setFlag(route.params?.flag)
      // console.log(flag);

    return (
      <AlertNotificationRoot>
        <View style={styles.container}>
            {!netInfo.isConnected && (
              <View style={styles.noConnectionMessage}>
                <Text style={styles.noConnectionText}>No hay conexión a Internet</Text>
              </View>
            )}
            <QRCodeScanner
                ref={scannerRef}
                onRead={(e) => handleScan(e, flag == undefined ? 1 : flag)}
                flashMode={light ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.auto}
                topContent={<></>}
                rectOfInterest={{
                  x: 0.2, // Coordenadas de la esquina superior izquierda de la región de interés
                  y: 0.4,
                  width: 0.6, // Ancho y alto de la región de interés (proporcional al tamaño de la cámara)
                  height: 0.2,
                }}
                bottomContent={
                    <View style={styles.buttonContainer}>
                    <Button
                        title=''
                        icon={{ ...styles.iconButtonHome, size: 20, name: light ? 'flash-off': 'flash-on'}}
                        iconContainerStyle={styles.iconButtonHomeContainer}
                        titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                        buttonStyle={{ ...styles.buttonHome, height: 40 ,}}
                        containerStyle={{ ...styles.buttonHomeContainer, flex: 1 }}
                        onPress={() => { setLight(!light) }}
                    />
                     { flag == undefined ? false : true  && (
                        <Button
                        title=""
                        icon={{ ...styles.iconButtonHome, size: 20, name: 'add-to-drive' }}
                        iconContainerStyle={styles.iconButtonHomeContainer}
                        titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                        buttonStyle={{ ...styles.buttonHome, height: 40 }}
                        containerStyle={{ ...styles.buttonHomeContainer, flex: 1 }}
                        onPress={() => { boletosConfirmados()  }}
                        />
                    )}
                     {flag == undefined ? false : true  && (
                        <Button
                        title=""
                        icon={{ ...styles.iconButtonHome, size: 20, name: 'cancel' }}
                        iconContainerStyle={styles.iconButtonHomeContainer}
                        titleStyle={{ ...styles.titleButtonHome, fontSize: 20 }}
                        buttonStyle={{ ...styles.buttoncancel, height: 40 }}
                        containerStyle={{ ...styles.buttonHomeContainer, flex: 1 }}
                        onPress={() => { sincronizar()  }}
                        />
                    )}
                    
                </View>
                }
            />
            <View style={styles.overlay}>
               <View style={styles.box}>
                <Text style={styles.scanText}>Escanee el código QR</Text>
               </View>
            </View>
            <View>
              {!responsesuccess && (
                <CustomAlert
                  visible={alertVisible}
                  icon={icon ?'check' : 'error' }
                  title={icon ? 'Éxito' : 'Error'}
                  message={responsemensaje}
                  options={options}
                  onClose={closeAlert}
                />
              )}
          </View>
        </View>
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </AlertNotificationRoot>
    );
}

export default QRscanner;


