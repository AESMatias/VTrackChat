import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { queryOpenAI, queryOpenAIForImage } from '@/components/services/openAIQueries';
import { VoiceRecognitionButton } from '@/components/VoiceRecognition'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SpeechRecordingStatus, useUserProfileStore } from '@/store/userProfile';
import { RecordingSpeechAnimation } from '@/components/RecordingSpeechAnimation';
import { generalColors } from '@/components/generalColors';
import { BackgroundGradientTyping } from '@/components/BackgroundGradient';
import { DeleteButton } from '@/components/DeleteButton';

interface TypingZoneProps {
    // Props definition
}

enum streamStatusValues {
    WRITING = "writing",
    SENDED = "sended",
    STREAMING = "STREAMING",
    FINISHED = "finished", // This means that the stream of data has not started yet
    ERROR = "error",
}

interface TypingZoneProps {
    text: string;
    setText: (text: string) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
    isMicrophoneListening: boolean;
    setIsMicrophoneListening: (isListening: boolean) => void;
}

export const TypingZone = ({text,setMessages,setText,messages, isMicrophoneListening, setIsMicrophoneListening}:TypingZoneProps) => {

    const speechRecordingStatus = useUserProfileStore(state => state.speechRecordingStatus)

    const handleSendMessage = async () => {
        setMessages([...messages, text])
        try{
            setText('')
            const queryResponse = await queryOpenAI(text, messages)
            setMessages([...messages, queryResponse])
        }catch(e){
            console.log('Error at sending the message:', e)
        }
    }

    const handleInputChange = (text: string) => {
        setText(text)
    }

  return (
    <BackgroundGradientTyping text={text}>
        <View style={styles.container}>
                
            <View style={styles.textInputContainer}>

                {speechRecordingStatus === SpeechRecordingStatus.Recording 
                ? <RecordingSpeechAnimation></RecordingSpeechAnimation>
                : <TextInput style={styles.textInput} 
                placeholder='What do you want to say?'
                placeholderTextColor="white"
                aria-label='Write a prompt query'
                onChangeText={handleInputChange}>
                    <Text>{text}</Text>
                </TextInput>
                }

            </View>

            <DeleteButton text={text} setText={setText}/>
            
            {(text==='')
            ? (<View>
                <VoiceRecognitionButton setText={setText}/>
            </View>)
            : null}
            
            <Pressable style={styles.sendButton} onPress={handleSendMessage}> 
                {/* TODO: This should be a personalized component */}
                <MaterialCommunityIcons 
                name="send-circle" size={40} color="white" />
            </Pressable>
            
        </View>
    </BackgroundGradientTyping>

  )
}

const styles = StyleSheet.create({
    sendButton: {
        // backgroundColor:'red',
        paddingHorizontal: 10,
        right: -20,
    },
    container: {
        flexDirection: 'row',
        // backgroundColor: generalColors.typingZoneInput,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 1,
        height:50,
    },
    textInputContainer: {
        flex: 1,
        flexWrap: 'nowrap',
    },
    textInput: {
        color:'white',
        textDecorationLine: "none",
        fontSize: 15,
        fontFamily: 'sans-serif',
        backgroundColor: 'rgba(0,0,0,.7)',
        height: 45,
        paddingRight: 30,
        paddingHorizontal: 5,
        paddingLeft: 10,
        // marginHorizontal: 3,
        borderRadius: 10,
        borderTopLeftRadius:5,
        borderTopRightRadius: 5,
    }
});