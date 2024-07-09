import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: 30,
    },
    iconButtonHomeContainer: { marginRight: 5 },
    iconButtonHome: {
        type: 'material',
        size: 20,
        color: 'white',
    },
    titleButtonHome: { 
        fontWeight: '700', 
        fontSize: 25 
    },
    buttonHome: {
        backgroundColor: '#0303b5',
        // backgroundColor: 'rgba(255, 103, 7, 1)',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20,
        height: 100,
    },
    buttoncancel:{
        backgroundColor: 'red',
        // backgroundColor: 'rgba(255, 103, 7, 1)',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20,
        height: 100,
    },
    buttonHomeContainer: {
        width: 300,
        marginHorizontal: 30,
        marginVertical: 20,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      },
      scanText: {
        marginTop:100,
        margin: 90,
        fontSize: 18,
        color: '#fff',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10
    },
    appBar: {
    // position: 'absolute',
    // bottom: 10,
    // right: 10,
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  appBarButton: {
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  overlayconection: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  conection: {
    fontSize: 40,
    color: 'red',
  },
//   noConnectionMessage: {
//     backgroundColor: 'red',
//     padding: 10,
//     alignItems: 'center',
//   },
  noConnectionText: {
    color: 'red',
    fontSize: 20,
  },
  box: {
    height: '40%', // Alto del cuadro (proporcional al tamaño del contenedor)
    width: '80%',  // Ancho del cuadro (proporcional al tamaño del contenedor)
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default styles;