import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Clipboard } from 'react-native';


export const MessageItem = ({message}) => {

    const handlePress = () => {
        Clipboard.setString(message);
        // if (!muted) {
        //     playSound();
        // }
        // setcharModal(true);
        // setFilledModal(prevObject => ({ ...prevObject, ...charData }));
        // console.log(charData.images[0]);
        // // We fill the modal with the character data
    }

    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.general_container}>

                <View style={styles.container}>
                    <Text style={styles.text}>
                    {message}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageNotFound: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderColor: 'white',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    container_info: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
    },
    general_container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 0.8,
        borderColor: 'rgba(200, 255, 200, 0.8)',
        borderRadius: 10,
        width: '75%',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 5,
        margin: 5,

    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(10, 200, 220, 1)',
        padding: 2,
        marginTop: 3,
        borderRadius: 3,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textAlign: 'center',
        minWidth: '60%',
        //ponle borde a las letras
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',

    }
})