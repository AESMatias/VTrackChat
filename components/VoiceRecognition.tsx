import React, {useState} from 'react'
import Voice from '@react-native-voice/voice';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


// TODO: Movew this enum to types folder
export enum VoiceStatus {
    STARTED = 'STARTED',
    STOPPED = 'STOPPED',
    RECOGNIZED = 'RECOGNIZED',
    ERROR = 'ERROR',
    END = 'END',
}

export enum Languages {
    ENGLISH = 'en-US',
    SPANISH = 'es-ES',
}

interface Props {
    isMicrophoneListening: boolean;
    setIsMicrophoneListening: (isListening: boolean) => void;
}

export const VoiceRecognitionButton = ({isMicrophoneListening, setIsMicrophoneListening}:Props) => {


    const [text, setText] = useState('');


    const startListening = async () => {
        try {
            await Voice.start(Languages.ENGLISH);
            setIsMicrophoneListening(true);
        } catch (e) {
            console.error('Error starting voice recognition', e);
        }
    }

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsMicrophoneListening(false);
        } catch (e) {
            console.error('Error stopping voice recognition', e);
            await Voice.destroy(); //Then, kill the voice recognition
        }
    }

    Voice.onSpeechResults = (e) => {
        setText(e.value[0]); // This is the recognized text converted to a string
        console.log('Voice recognition results', e.value[0]);
      };

    return (
        <Pressable
        onLongPress={startListening} onPressOut={stopListening}>

        {isMicrophoneListening
        ? <FontAwesome name="microphone" size={24} color="black" />
        :<FontAwesome name="microphone-slash" size={24} color="black" />
        }

        </Pressable>
    )

}