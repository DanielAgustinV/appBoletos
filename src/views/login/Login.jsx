import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView,Alert } from 'react-native';
import ApiRequest from '../../api/request';
import endpoints from '../../api/endponits';
// import { useAuth } from '../../helper/AuthContext';
import CustomAlert from '../ui/alerts';
// import { useNavigation } from '@react-navigation/native';
import {guardar} from '../../helper/storage';
import { Icon } from 'react-native-elements';



const LoginScreen = ({navigation}) => {

  // const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(true);
  const [responsemensaje, setResponsemensaje] = useState(null);
  const [responsesuccess, setResponsesuccess] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };


  //  const { login } = useAuth();



  const closeAlert = () => {
    setAlertVisible(false);
      
  };
  const options = [
    { text: 'Aceptar', onPress: closeAlert },
  ];
  const valida = async () => {
    // navigation.navigate('HomePuller');
    if (email == '' || password == '') {
      Alert.alert('Por favor llena todos los campos');
      return;
    } else if (!validateEmail(email)){
      Alert.alert('Correo electrónico no valido');
    }else if(!password){
      Alert.alert('Contraseña no valida');
    }else{
      // navigation.replace('HomePuller')
      // console.log('check' +isChecked);
      const datos = {
          usuario : email,
          password :password,
      };
      console.log(datos);
    //   const datos = {
    //     usuario : "escaner@fasticket.mx",
    //     password :"Fa5tick3t.mx",
    // };
      console.log(datos);

            try {
        const data = await ApiRequest( datos, endpoints.login,'POST');
        // const token = data.token;
        // console.log(token);
        // navigation.replace('Home');
                if(data.success == true){
        // setResponseData(data);

          const token = data.token;
          console.log(token);
          // return;
          const userData = data;
          // login(token,userData);
          guardar('token',token)
          // const guardarToken = async (token) => await AsyncStorage.setItem('@token', token)

            navigation.replace('Home');
        } else if (data.success == false){
          setResponsemensaje(data.mensaje);
          setResponsesuccess(data.success)
          setAlertVisible(true);
        }
      } catch (error) {

        console.error('Error al obtener datos:', error);
      }
      // Alert.alert('respuesta de login');

    }
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      {/* <Text style={styles.title}>Iniciar Sesión d</Text> */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#fff" // Color del placeholder
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Contraseña"
            placeholderTextColor="#fff" // Color del placeholder
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
            <Icon name={secureTextEntry ? 'visibility-off' : 'visibility'} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={valida}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}></Text>
        </TouchableOpacity>
      </View>
      {/* <Alert
      title="Alerta personalizada"
      message="¡Esto es un mensaje de alerta personalizado!"
      onPress={valida}
    /> */}
    </View>
    <View>
      {!responsesuccess && (
        <CustomAlert
          visible={alertVisible}
          icon={'cancel'}
          title={responsesuccess ? 'Éxito' : 'Error..'}
          message={responsemensaje}
          options={options}
          onClose={closeAlert}
        />
      )}
    </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'white'
},
imageContainer: {
  marginTop: 10, // Ajusta este valor para mover la imagen hacia arriba o hacia abajo
  marginBottom:20
},
logo: {
  width: 380,
  height: 250,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
  marginBottom: 20,
},
form: {
  width: '80%',
},
input: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  marginBottom: 20,
  paddingHorizontal: 10,
  backgroundColor: 'gray',
  color: '#fff', // Color del texto ingresado
  height:45
},
passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  marginBottom: 20,
  backgroundColor: 'gray',
  height:45,
  // width: 200
  
},
passwordInput: {
  flex: 1,
   marginTop:20,
  height: 45, // Asegura que el campo de contraseña tenga la misma altura que el de correo
  paddingHorizontal: 10,
  borderWidth:0,
  color: '#fff',

},
iconContainer: {
  padding: 10,
},
loginButton: {
  backgroundColor: '#0303b5',
  padding: 15,
  borderRadius: 5,
  alignItems: 'center',
  marginBottom: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
forgotPasswordButton: {
  marginTop: 10,
  alignItems: 'center',
},
forgotPasswordText: {
  color: '#fff',
},
registerButton: {
  marginTop: 20,
  alignItems: 'center',
},
registerText: {
  color: '#fff',
  textDecorationLine: 'underline',
},
});


export default LoginScreen;
