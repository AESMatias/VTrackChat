import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { queryOpenAI, queryOpenAIForImage } from '@/components/services/openAIQueries';
import { VoiceRecognitionButton } from '@/components/VoiceRecognition'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SpeechRecordingStatus, useUserProfileStore } from '@/store/userProfile';
import { RecordingSpeechAnimation } from '@/components/RecordingSpeechAnimation';
import { generalColors } from '@/components/generalColors';


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

    const [voiceToText, setVoiceToText] = useState('')

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
    <View style={styles.container}>
        <View style={styles.textInputContainer}>

            {speechRecordingStatus === SpeechRecordingStatus.Recording 
            ? <RecordingSpeechAnimation></RecordingSpeechAnimation>
            : <TextInput style={styles.textInput} placeholder='What do you want to say?'
            onChangeText={handleInputChange}>
                <Text>{text}</Text>
            </TextInput>
            }

        </View>

        <VoiceRecognitionButton setText={setText} 
        />

        <Pressable style={styles.sendLogo}
        onPress={handleSendMessage}> 
            {/* TODO: This should be a personalized component */}
            <MaterialCommunityIcons name="send-circle" size={40} color="white" />
        </Pressable>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: generalColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap:3,
        paddingHorizontal: 2,
    },
    textInputContainer: {
        flex: 1,
        flexWrap: 'nowrap',
    },
    sendLogo: {
        color: 'white',
        fontSize: 30,
    },
    textInput: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'sans-serif',
        backgroundColor: 'black',
        height: 25,
        paddingRight: 15,
        paddingHorizontal: 5,
        paddingLeft: 5,
        marginHorizontal: 3,
        borderRadius: 4,
    }
});