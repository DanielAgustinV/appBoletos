import axios from 'react-native-axios';
import endpoints from './endponits';

const ApiRequest = async (data,endpoiname,tipo) => {
  try {
    console.log(endpoints.urlproductivo + '/' + endpoiname);
    const response = await axios({
      method: tipo,
      url: endpoints.urlproductivo  + endpoiname,
      data: data,
      headers:  {
        'Content-Type': 'application/json',
      },
    });
      // console.log('RESPUESTA' + response.data);
      console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {      
      // El servidor respondió con un código de error (no 2xx)
      console.log('Código de estado:', error.response.status);
      if (error.response.status === 401) {
        console.log(response.data);
        // Manejo específico para error 401
        console.log('Error 401: No autorizado');
        response = false
        return response;
        // Puedes mostrar un mensaje al usuario o realizar alguna acción específica
      } else {
        // Otro código de error, manejar según sea necesario
        console.log('Error:', error.response.data);
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.log('Error de solicitud:', error.request);
    } else {
      // Ocurrió un error antes de enviar la solicitud
      console.log('Error:', error.message);
    }
    // console.error('Error en la solicitud:', error);
    throw error;
  }
};
export default ApiRequest;