import axios from 'react-native-axios';
import endpoints from './endponits';

const ApiRequest = async (data,endpoiname) => {
  try {
    console.log(endpoints.urlproductivo + '/' + endpoiname);
    const response = await axios({
      method: 'POST',
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
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
export default ApiRequest;