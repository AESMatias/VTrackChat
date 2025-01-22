import { Image, Pressable, StyleSheet, Text, View , Animated} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Clipboard, Vibration } from 'react-native';

interface MessageItemProps {
    message: string,
    senderUsername:string,
    senderImageUrl: string,
}

// message={item.text} 
// senderUsername={item.senderUsername} 
// senderImageUrl={item.senderImageUrl}

export const MessageItem = ({itemData}: MessageItemProps) => {
    
    // console.error('DATA', itemData)

    const { message=itemData.message,
        username = itemData.senderUsername,
         senderImageUrl = itemData.senderImageUrl } = itemData || {}; //TODO: Change the default values

    
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(backgroundColorAnim, { 
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
        }).start();

    // Revert to original values after a delay
    const timeout = setTimeout(() => {
        Animated.timing(backgroundColorAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, 200);

    // return () => clearTimeout(timeout);

    }, []);

    const interpolatedBackgroundColor = backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(10,10,10,0.6)', 'rgba(250,250,250,.2)']  
    });

    const animatePressedItem = () => {
            Animated.timing(scaleAnim, { 
            toValue: .95,
            duration: 50,
            useNativeDriver: false,
            }).start();

        // Revert to original values after a delay
        const timeout = setTimeout(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }, 200);
    }

    const handlePress = () => {
        Vibration.vibrate(50);
        animatePressedItem()
        Clipboard.setString(message); // TODO: Change this, it is obsolete!

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

            <Animated.View style={[styles.general_container,{
                backgroundColor: interpolatedBackgroundColor,
                transform: [{ scale: scaleAnim }]
            }]}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: senderImageUrl }} 
                    style={styles.image} >
                    </Image>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                    {`${username}: ${message}`}
                    </Text>
                </View>

            </Animated.View>

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
        resizeMode: 'contain',
        aspectRatio: 1/1, //eTo reserve the space of the image.
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