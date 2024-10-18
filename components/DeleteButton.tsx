import React, {useState} from 'react'
import Voice from '@react-native-voice/voice';
import { Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUserProfileStore, SpeechRecordingStatus } from '@/store/userProfile';


interface Props {
    text: string,
    setText: (text: string) => void;
}

export const DeleteButton = ({text, setText}) => {
    
    
    // const updateSpeechRecordingStatus = useUserProfileStore( state => state.updateSpeechRecordingStatus);
    // const speechRecordingStatus = useUserProfileStore( state => state.speechRecordingStatus);


    const handleToDelete = () => {
        console.log('AAA', text)
        setText('')
    }

    return (
        <>

        {(text === '') 
        ? (null)
        : (<Pressable style={style.pressable} onPress={handleToDelete}>
            <AntDesign name="closecircleo" size={18} color="white" />
            </Pressable>)
        }

        </>
    )

};

const style = StyleSheet.create({
    pressable: {
        padding:5,
        position: 'absolute',
        right: 70,
        opacity: .5,
    }
}) 