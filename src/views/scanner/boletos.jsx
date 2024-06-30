// import React, { useState } from 'react';
// import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

// const TicketDownload = () => {
//   const [downloading, setDownloading] = useState(false);
//   const [tickets, setTickets] = useState([]);

//   // Función simulada de descarga de boletos
//   const handleDownloadTickets = () => {
//     // Simular tiempo de carga con un delay
//     setDownloading(true);
//     setTimeout(() => {
//       // Supongamos que estos son los boletos descargados
//       const downloadedTickets = [
//         { id: 1, name: 'Ticket A' },
//         { id: 2, name: 'Ticket B' },
//         { id: 3, name: 'Ticket C' },
//       ];
//       setTickets(downloadedTickets);
//       setDownloading(false);
//     }, 2000); // Simular 2 segundos de descarga
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Descarga de Boletos</Text>
//       <Button
//         title={downloading ? 'Descargando...' : 'Descargar Boletos'}
//         onPress={handleDownloadTickets}
//         disabled={downloading}
//       />
//       {downloading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
//       {tickets.length > 0 && (
//         <FlatList
//           data={tickets}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.ticketItem}>
//               <Text>{item.name}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   loadingIndicator: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   ticketItem: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 10,
//     borderRadius: 5,
//   },
// });

// export default TicketDownload;

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'react-native-axios';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data'); // Reemplaza esta URL con la de tu servicio
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default MyComponent;
