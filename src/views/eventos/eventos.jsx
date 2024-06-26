import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

// Datos de ejemplo de eventos tipo concierto
const concertEvents = [
  {
    id: '1',
    title: 'Concierto en Vivo',
    date: 'Sábado, 1 de Julio',
    location: 'Teatro Principal',
    image: require('../../assets/l.jpeg'),
  },
  {
    id: '2',
    title: 'Festival de Verano',
    date: 'Viernes, 15 de Julio',
    location: 'Parque Central',
    image: require('../../assets/final.jpeg'),
  },
  {
    id: '3',
    title: 'Recital de Rock',
    date: 'Domingo, 30 de Julio',
    location: 'Estadio Nacional',
    image: require('../../assets/l.jpeg'),
  },
  {
    id: '4',
    title: 'Chalino Sanchez',
    date: 'Sabado, 29 de Julio',
    location: 'auditorio Nacional',
    image: require('../../assets/chalino.jpg'),
  },
  {
    id: '5',
    title: 'Tigres del Norte',
    date: 'Sabado, 29 de Julio',
    location: 'auditorio Nacional',
    image: require('../../assets/tigres.jpg'),
  },
  {
    id: '6',
    title: 'Proximamente',
    date: 'Sábado, 1 de Julio',
    location: 'Teatro Principal',
    image: require('../../assets/l.jpeg'),
  },{
    id: '7',
    title: 'Proximamente',
    date: 'Sábado, 1 de Julio',
    location: 'Teatro Principal',
    image: require('../../assets/l.jpeg'),
  },
];

const ConcertList = () => {
  // Renderización de cada tarjeta de evento
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={concertEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDate: {
    color: '#666',
    marginBottom: 5,
  },
  cardLocation: {
    color: '#666',
  },
});

export default ConcertList;
