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
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
      },
      scanText: {
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
});

export default styles;