import React, {useState} from 'react'
import Voice from '@react-native-voice/voice';
import { Pressable, StyleSheet, Animated, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useUserProfileStore, SpeechRecordingStatus } from '@/store/userProfile';
import { Vibration } from 'react-native';
import { Directions, Gesture, GestureDetector,
    GestureHandlerRootView,} from 'react-native-gesture-handler';


// TODO: Movew this enum to types folder
// export enum VoiceStatus {
//     STARTED = 'STARTED',
//     STOPPED = 'STOPPED',
//     RECOGNIZED = 'RECOGNIZED',
//     ERROR = 'ERROR',
//     END = 'END',
// }

export enum Languages {
    ENGLISH = 'en-US',
    SPANISH = 'es-ES',
}

interface Props {
    setText: (text: string) => void;
}

export const VoiceRecognitionButton = ({setText}:Props) => {
    
    const [isRecordingTapped, setIsRecordingTapped] = useState(false);

    const updateSpeechRecordingStatus = useUserProfileStore( state => state.updateSpeechRecordingStatus);
    const speechRecordingStatus = useUserProfileStore( state => state.speechRecordingStatus);

    const { width } = Dimensions.get('screen');

    const handleVibrate = () => {
        Vibration.vibrate(50);
    }

    const startListening = async () => {
        Vibration.vibrate(50);
        try {
            await Voice.start(Languages.SPANISH);
            updateSpeechRecordingStatus(SpeechRecordingStatus.Recording);
        } catch (e) {
            console.error('Error starting voice recognition', e);
        }
    }

    const stopListening = async () => {
        try {
            await Voice.stop();
            updateSpeechRecordingStatus(SpeechRecordingStatus.Inactive);
        } catch (e) {
            console.error('Error stopping voice recognition', e);
            await Voice.destroy(); //Then, kill the voice recognition
        }
    }

    Voice.onSpeechResults = (e) => {
        if (e?.value === undefined) return;
        try {
            const lastMessage = e?.value[0]
            console.log('Voice recognition results:', lastMessage);
            setText((prevMessage: string) => prevMessage + ' ' + lastMessage); //TODO: solve this!
        } catch {
            console.error('Error at voice recognition results');
        }
    };



    return (
    
                <Animated.View>

                    <Pressable style={style.pressable}
                    // onPressIn={handleVibrate}
                    onLongPress={startListening} 
                    onPressOut={stopListening}>

                    {speechRecordingStatus === SpeechRecordingStatus.Recording
                    ? <FontAwesome name="microphone-slash" size={25} color="white" />
                    :<FontAwesome name="microphone" size={25} color="white" />
                    }
                    </Pressable>

                </Animated.View>
    )

};

const style = StyleSheet.create({
    pressable: {
        paddingVertical: 5,
        paddingHorizontal:15,
        right: -10,
    },
}) 