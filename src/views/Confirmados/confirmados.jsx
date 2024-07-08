
import { connectToDatabase, createTableIfNotExists, insertBoleto, updateBoleto, getBoletos ,clearTable} from '../../database/database';


// DetailScreen.js
// import React from 'react';
import React, { useState ,useEffect} from 'react';

import { View, StyleSheet,Alert,Text ,ScrollView} from 'react-native';
import { Appbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import ApiRequest from '../../api/request';
import { obtener } from '../../helper/storage';
import endponints from '../../api/endponits';
import { TabRouter } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function DetailScreen({ navigation }) {

  useEffect(() => {
    const getDatos = async () => {
      try {
        const data = await getBoletos();
        setBoletos(data);
        if(data == ''){
          console.log('no hay info');
          setFlag(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDatos();
  }, []);

    // const [boletos, setBoletos] = useState(false);
    const [boletos, setBoletos] = useState([]);
    const [flag, setFlag] = useState(true);



    const cargarBoletos = async () =>{
         try {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'Atencion',
              textBody: '¿Estás seguro de cargar esta información? solo se puede realizar una unica vez',
              button: 'Aceptar',
              closeOnOverlayTap: true,
              onPressButton:() => { cargarBoletosconfirmados(boletos)}
            })
        } catch (error) {
          console.error(error);
        }
    }

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
            
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Exito',
              textBody: data.mensaje,
              button: 'Aceptar',
              closeOnOverlayTap: true,
              onPressButton:() => { navigation.navigate('Home')}
            })
            deleteRegistros();
          } else if (data.success == false){
              Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Exito',
                textBody: data.mensaje,
                button: 'Aceptar',
                closeOnOverlayTap: true,
                // onPressButton:() => { navigation.navigate('Home')}
              })
          }
        } catch (error) {

          console.error('Error al obtener datos:', error);
        }
      }

      const deleteRegistros =  async () =>{
        try {
            const message = await clearTable();
            console.log(message);
            fetchBoletos(); // Actualizar la lista de boletos después de limpiar la tabla
          } catch (error) {
            console.error(error);
          }
      }
    return (
      // <ScrollView>

      // </ScrollView>
      <AlertNotificationRoot>
               <View style={{ flex: 1 }}>
       <Appbar.Header>
           <Appbar.BackAction onPress={() => navigation.goBack()} />
           <Appbar.Content title="Boletos Confirmados" />
           <Appbar.Action icon="qrcode-scan" onPress={() => navigation.navigate('Escaner',{ flag: 0})}  />
       </Appbar.Header>
       <ScrollView>
       {flag ? (
          <View style={styles.container}>
            <Card>
            <Card.Content>
                <Title>Natanael Cano</Title>
                {boletos.map((boleto, index) => (
                  // <Text style={styles.headerText} key={index}>ID: {boleto.id}, Asiento: {boleto.id_asiento}, Estatus: {boleto.id_estatus} </Text>
                <Paragraph key={index}>Asiento: {boleto.id_asiento}, Estatus: {boleto.id_estatus == 4 ? 'CONFIRMADO' : 'PENDIENTE'}</Paragraph>
                ))}
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => cargarBoletos()}>Cargar informacion</Button>
            </Card.Actions>
            </Card>
           </View>
        ) : (
          <Text style={styles.centeredText}>Por el momento No hay registros</Text>
        )}
       </ScrollView>
       </View>
      </AlertNotificationRoot>

    );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centeredText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
