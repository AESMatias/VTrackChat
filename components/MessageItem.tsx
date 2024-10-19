import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Clipboard, Vibration } from 'react-native';

interface MessageItemProps {
    message: string,
}


export const MessageItem = ({message}: MessageItemProps) => {

    const LOGOLINK = 'https://avatars.githubusercontent.com/u/119653204?v=4' //TODO: CHANGE

    const handlePress = () => {
        Clipboard.setString(message); // TODO: Change this, it is obsolete!
        Vibration.vibrate(50);

        // if (!muted) {
        //     playSound();
        // }
        // setcharModal(true);
        // setFilledModal(prevObject => ({ ...prevObject, ...charData }));
        // console.log(charData.images[0]);
        // // We fill the modal with the character data
    }

    return (
        <Pressable onLongPress={handlePress}>

            <View style={styles.general_container}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: LOGOLINK }} 
                    style={styles.image} >
                    </Image>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                    {message}
                    </Text>
                </View>

            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    general_container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal:5,
        paddingVertical:2,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10,10,10,0.6)',
        // backgroundColor: 'red',
        borderRadius: 10,
        width: '97.5%',
        alignSelf: 'center',
        borderColor: 'white',
        borderBottomWidth: 0.2,
        borderTopWidth: 0.1,
    },
    textContainer: {
        flex: 7,
        flexDirection: 'column',
        borderRadius: 5,
        margin: 5,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        paddingHorizontal: 0,
        marginVertical: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        // fontWeight: 'bold',
        // padding: 2,
        // marginTop: 3,
        // textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textAlign: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'hsla(100%,100%,100%,.9)',
        alignSelf: 'center',
    },
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
    }
})