import React, {useState} from 'react'
import Voice from '@react-native-voice/voice';
import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useUserProfileStore, SpeechRecordingStatus } from '@/store/userProfile';

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
    setText: (text: string) => void;
}

export const VoiceRecognitionButton = ({setText}:Props) => {
    
    
    const updateSpeechRecordingStatus = useUserProfileStore( state => state.updateSpeechRecordingStatus);
    const speechRecordingStatus = useUserProfileStore( state => state.speechRecordingStatus);

    const startListening = async () => {
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
        try {
            const lastMessage = e?.value[0]
            console.log('Voice recognition results:', lastMessage);
            setText((prevMessage) => prevMessage + ' ' + lastMessage);
        } catch {
            console.error('Error at voice recognition results');
        }
    };

    return (
        <Pressable style={style.pressable}
        onLongPress={startListening} onPressOut={stopListening}>

        {speechRecordingStatus === SpeechRecordingStatus.Recording
        ? <FontAwesome name="microphone" size={30} color="white" />
        :<FontAwesome name="microphone-slash" size={30} color="white" />
        }

        </Pressable>
    )

};

const style = StyleSheet.create({
    pressable: {
        // backgroundColor:'green',
        paddingVertical: 10,
        paddingHorizontal:15,
        right: -10,
    },
}) 