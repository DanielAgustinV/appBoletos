import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'react-native-axios';
import endponints from '../../api/endponits';
import { Picker } from '@react-native-picker/picker';
import { obtener } from '../../helper/storage';
import ApiRequest from '../../api/request';
import { createTableIfNotExists, insertBoleto, updateBoleto, getBoletos,connectToDatabase } from '../../database/database';
import CustomAlert from '../ui/alerts';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

// const db = SQLite.openDatabase({ name: 'evento.db', location: 'default' });

const Boletos = ({navigation}) => {
  const [firstSelectData, setFirstSelectData] = useState([]);
  const [secondSelectData, setSecondSelectData] = useState([]);
  const [selectedFirst, setSelectedFirst] = useState('');
  const [selectedSecond, setSelectedSecond] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [responsemensaje, setResponsemensaje] = useState(null);
  const [responsesuccess, setResponsesuccess] = useState(true);
  // const [secureTextEntry, setSecureTextEntry] = useState(true);


  // const toggleSecureTextEntry = () => {
  //   setSecureTextEntry(!secureTextEntry);
  // };


  //  const { login } = useAuth();



  const closeAlert = () => {
    // setAlertVisible(false);
    navigation.replace('Escaner',{ flag: 0});
      
  };
  const options = [
    { text: 'Aceptar', onPress: closeAlert },
  ];

  useEffect(() => {
    const getEventos = async () => {
      try {
        const token = await obtener('token');
        if (!token) {
          Alert.alert('Error', 'No se pudo obtener el token');
          return;
        }
        const response = await axios.get(`${endponints.urlproductivo}${endponints.eventos}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.status == 200){
            setFirstSelectData(response.data.eventos);
            const initializeDatabase = async () => {
              try {
                const db = await connectToDatabase();
                await createTableIfNotExists(db);
                // fetchBoletos();
              } catch (error) {
                console.error(error);
              }
            };
        
            initializeDatabase();
          }else{
            Alert.alert('Error', data.eventos);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Atencion',
              textBody: data.eventos,
              button: 'Aceptar',
              closeOnOverlayTap: false,
              // onPressButton:() => {borrarRegistros()}
            })
            return;
          }
      } catch (error) {
              console.error('Error fetching first select data:', error);
      }
    };

    getEventos();
  }, []);

  const getFechas = async (id_evento) => {
    if(id_evento == ''){
      setLoading(true);
      return;
    }
    console.log(id_evento);
     console.log(`${endponints.urlproductivo}${endponints.fechas}${id_evento}`);
    // return;
    setSelectedFirst(id_evento);
    // setLoading(true);

    try {
      const token = await obtener('token');
      if (!token) {
        Alert.alert('Error', 'No se pudo obtener el token');
        return;
      }
      const config = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      };
      const response = await fetch(`${endponints.urlproductivo}${endponints.fechas}${id_evento}`, config); 
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      if (response.status === 200) {
          console.log(data.fechas);
           setSecondSelectData(data.fechas);

      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Atencion',
          textBody: data.fechas,
          button: 'Aceptar',
          closeOnOverlayTap: false,
          // onPressButton:() => {borrarRegistros()}
        })
        return;
      }

    } catch (error) {
      console.error('Error:', error.message);
    }finally {
        setLoading(false);
      }
  };

  const getBoletos = async () => {
    setLoading(true);
    const token = await obtener('token');
    if (!token) {
      Alert.alert('Error', 'No se pudo obtener el token');
      return;
    }
    const datos = {
      id_evento : selectedFirst,
      id_fecha :selectedSecond,
      token: token
    };
    try {
      const data = await ApiRequest( datos, endponints.boletos,'POST',token);
      // console.log(data.success);
      // console.log(data);
      if(data.success == true){
        console.log(data);
        boletosDatabase(data.eventos)
        // for (let boleto of data) {
        //   await insertBoleto(boleto.id_asiento, boleto.estatus);
        // }
        // data.eventos.map((evento) => (
        //    insertBoleto(evento.id_asiento, evento.estatus)
        // ))
        //  Alert.alert('success');

      } else if (data.success == false){
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: data.eventos,
          button: 'Aceptar',
          closeOnOverlayTap: false,
          // onPressButton:() => {borrarRegistros()}
        })
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }finally {
        setLoading(false);
      }
  };

  const boletosDatabase = async (eventos) => {
    try {
      for (const evento of eventos) {
        await insertBoleto(evento.id_asiento, evento.estatus);
      }
      // setResponsemensaje('Todos los boletos han sido guardados');
      // setResponsesuccess(false)
      // setAlertVisible(true);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: 'Todos los boletos han sido guardados',
        button: 'Aceptar',
        closeOnOverlayTap: false,
        onPressButton:() => {closeAlert()}
      })
      
      console.log('completo');
      // setLoading(false);
      // console.log('Todos los boletos han sido insertados');
      // Alert.alert('Todos los boletos han sido insertados');
      // fetchBoletos(); // Actualizar la lista de boletos después de insertar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertNotificationRoot>
    <View style={styles.container}>
      <Text style={styles.headerText}>Selecciona el Evento</Text>
      <Picker
        selectedValue={selectedFirst}
        onValueChange={(itemValue) => getFechas(itemValue)}
        // color={red}
      >
        <Picker.Item label="Seleccione una opción" value="" style={styles.headerText}/>
        {firstSelectData.map((item) => (
          <Picker.Item key={item.id_evento} label={item.nombre_evento} value={item.id_evento} style={styles.headerText} />
        ))}
      </Picker>
      {selectedFirst && (
        <>
          <Text style={styles.headerText}>Selecciona la Fecha</Text>
          <Picker
            selectedValue={selectedSecond}
            onValueChange={(itemValue) => setSelectedSecond(itemValue)}
          >
            <Picker.Item label="Seleccione una opción" value="" style={styles.headerText} />
            {secondSelectData.map((item) => (
              <Picker.Item key={item.id_fecha} label={item.fecha} value={item.id_fecha} style={styles.headerText} />
            ))}
          </Picker>

          <Button title="Sincronizar" onPress={getBoletos} />
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View>
      {!responsesuccess && (
        <CustomAlert
          visible={alertVisible}
          icon={'check'}
          title={alertVisible ? 'Éxito' : 'Error'}
          message={responsemensaje}
          options={options}
          onClose={closeAlert}
        />
      )}
    </View>
    </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
    headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});

export default Boletos;
