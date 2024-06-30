import * as React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import styles from '../../styles/styles'

function QRscanner({ navigation }) {
    return (
    <View style={styles.container}>
        <Button
        title="Descargar Boletos"
        onPress={() => navigation.navigate('Ticket')}
        icon={{ ...styles.iconButtonHome, name: 'cloud-download' }}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonHome}
        buttonStyle={styles.buttonHome}
        containerStyle={styles.buttonHomeContainer}
        />
        <Button
        title="Scan QR"
        onPress={() => navigation.navigate('Qr')}
        icon={{ ...styles.iconButtonHome, name: 'qr-code-scanner' }}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonHome}
        buttonStyle={styles.buttonHome}
        containerStyle={styles.buttonHomeContainer}
        />
    </View>
    );
}

export default QRscanner