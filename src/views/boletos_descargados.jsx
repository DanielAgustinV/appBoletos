import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView ,StyleSheet, Alert} from 'react-native';
import { connectToDatabase, createTableIfNotExists, insertBoleto, updateBoleto, getBoletos ,clearTable} from '../database/database';


const Descargas = () => {
  const [boletos, setBoletos] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await connectToDatabase();
        await createTableIfNotExists(db);
        fetchBoletos();
      } catch (error) {
        console.error(error);
      }
    };

    initializeDatabase();
  }, []);

  const fetchBoletos = async () => {
    try {
      const data = await getBoletos();
      setBoletos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsert = async () => {
    try {
      const insertId = await insertBoleto(1, 1);
      console.log(`Boleto insertado con ID: ${insertId}`);
      fetchBoletos(); // Actualizar la lista de boletos después de insertar
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const message = await updateBoleto(55, 4);
    //   console.log(message);
      Alert.alert(message);
      fetchBoletos(); // Actualizar la lista de boletos después de actualizar
    } catch (error) {
    //   console.error(error);
      Alert.alert(error);
    }
  };

  const clean =  async () =>{
    try {
        const message = await clearTable();
        console.log(message);
        fetchBoletos(); // Actualizar la lista de boletos después de limpiar la tabla
      } catch (error) {
        console.error(error);
      }
  }
// console.log(boletos);
  return (
    <View>
        <Button title="Insertar Boleto" onPress={handleInsert} />
        <Button title="Actualizar Boleto" onPress={handleUpdate} />
        <Button title="limpiar" onPress={clean} />
        <ScrollView>
            {boletos.map((boleto, index) => (
                <Text style={styles.headerText} key={index}>ID: {boleto.id}, Asiento: {boleto.id_asiento}, Estatus: {boleto.id_estatus} </Text>
            ))}
        </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
      headerText: {
      color: 'black',
    },
  });
  

export default Descargas;
