import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SyncAndScanComponent = ({ navigation }) => {
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const eventos = ['Natanael Cano', 'Chalino Sanchez', 'Valentin Elizalde'];
  const fecha = ['Viernes, 15 de Julio', 'Sabado, 29 de Julio', 'Sábado, 1 de Julio'];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      Alert.alert('Sincronización completa', 'Los datos se han sincronizado correctamente');
    }, 3000); // Simulación de una descarga que toma 3 segundos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Selecciona el Evento</Text>
      <Picker
        selectedValue={selectedValue1}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue1(itemValue)}
      >
        <Picker.Item label="Seleccione una opción" value="" />
        {eventos.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      <Text style={styles.headerText}>Selecciona la Fecha</Text>
      <Picker
        selectedValue={selectedValue2}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue2(itemValue)}
      >
        <Picker.Item label="Seleccione una opción" value="" />
        {fecha.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      {selectedValue1 && selectedValue2 && !isSynced && (
        <Button
          title="Sincronizar"
          onPress={handleSync}
          color="#0303b5" // Color del texto del botón
          titleStyle={styles.buttonTitle} // Estilo del texto del botón
          style={styles.button} // Estilo del contenedor del botón (no se aplica directamente en Button)
        />
      )}

      {isSyncing && <ActivityIndicator size="large" color="#0000ff" />}

      {isSynced && (
        <Button
          title="Escanear"
          onPress={() => navigation.navigate('Escaner')}
          color="#0303b5" // Color del texto del botón
          titleStyle={styles.buttonTitle} // Estilo del texto del botón
          style={styles.button} // Estilo del contenedor del botón (no se aplica directamente en Button)
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: 'red',
  },
  picker: {
    height: 50,
    width: 300,
    marginBottom: 20,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  button: {
    marginTop: 20, // Margen superior
    width: 300, // Ancho del botón
    borderRadius: 100, // Radio de borde
  },
  buttonTitle: {
    fontSize: 18, // Tamaño de fuente del texto del botón
    fontWeight: 'bold', // Peso de fuente del texto del botón
  },
});

export default SyncAndScanComponent;
