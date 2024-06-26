import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AlertNotification from 'react-native-alert-notification';

const Alert = ({ title, message, onPress }) => {
  const showAlert = () => {
    AlertNotification.show({
      title: title || 'Alerta',
      message: message || '¡Esto es una notificación de alerta!',
      onPress: onPress || (() => console.log('Notificación de alerta presionada')),
    });
  };
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Alert;
