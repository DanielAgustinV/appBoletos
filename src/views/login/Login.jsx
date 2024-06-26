import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ApiRequest from '../../api/request';
import endpoints from '../../api/endponits';
// import { useAuth } from '../../helper/AuthContext';
import CustomAlert from '../ui/alerts';
// import { useNavigation } from '@react-navigation/native';
import {guardar} from '../../helper/storage';


const LoginScreen = ({navigation}) => {

  // const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(true);
  const [responsemensaje, setResponsemensaje] = useState(null);
  const [responsesuccess, setResponsesuccess] = useState(true);


  //  const { login } = useAuth();



  const closeAlert = () => {
    setAlertVisible(false);
      
  };
  const options = [
    { text: 'Aceptar', onPress: closeAlert },
  ];
  const valida = async () => {
    // navigation.navigate('HomePuller');
    // if (form.email == '' || form.password == '') {
    //   Alert.alert('Por favor llena todos los campos');
    //   return;
    // } else if (!validateEmail(form.email)){
    //   Alert.alert('Correo electrónico no valido');
    // }else if(!form.password){
    //   Alert.alert('Contraseña no valida');
    // }else{
      // navigation.replace('HomePuller')
      // console.log('check' +isChecked);
      const datos = {
          usuario : "escaner@fasticket.mx",
          password :"Fa5tick3t.mx"
      };
      console.log(datos);
            try {
        const data = await ApiRequest( datos, endpoints.login);
        const token = data.token;
        console.log(token);
        navigation.replace('Home');
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
    // }
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/final.jpeg')} style={styles.logo} />
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
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff" // Color del placeholder
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
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
              icon={responsesuccess ? 'check' :  'closecircleo'  }
              title={responsesuccess ? 'Éxito' : 'Error..'}
              message={responsemensaje}
              options={options}
              onClose={closeAlert}
            />
          )}
{/* <WarningOutlined /> */}
          </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 50, // Ajusta este valor para mover la imagen hacia arriba o hacia abajo
  },
  logo: {
    width: 400,
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
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    color: '#fff', // Color del texto ingresado
  },
  loginButton: {
    // backgroundColor: '#f5d033',
    backgroundColor: '#e0e155',
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
