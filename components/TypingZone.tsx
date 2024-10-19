import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native'
import { queryOpenAI, queryOpenAIForImage } from '@/components/services/openAIQueries';
import { VoiceRecognitionButton } from '@/components/VoiceRecognition'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SpeechRecordingStatus, useUserProfileStore } from '@/store/userProfile';
import { RecordingSpeechAnimation } from '@/components/RecordingSpeechAnimation';
import { generalColors } from '@/components/generalColors';
import { BackgroundGradientTyping } from '@/components/BackgroundGradient';
import { DeleteButton } from '@/components/DeleteButton';


interface TypingZoneProps {
    text: string;
    setText: (text: string) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
    isMicrophoneListening: boolean;
    setIsMicrophoneListening: (isListening: boolean) => void;
}


export const TypingZone = ({text,setMessages,setText,messages, isMicrophoneListening, setIsMicrophoneListening}:TypingZoneProps) => {

    const [isFocused, setIsFocused] = useState(false);


    const speechRecordingStatus = useUserProfileStore(state => state.speechRecordingStatus);

    useEffect(() => {
        // Listener for keyboard hide event
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsFocused(true);

        });

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsFocused(false);
        });

        // Cleanup the listener on component unmount!
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleSendMessage = async () => {
        setMessages([...messages, text])
        try{
            setIsFocused(true);
            Keyboard.dismiss();
            setText('');
            const queryResponse = await queryOpenAI(text, messages);
            setMessages([...messages, queryResponse]);
        }catch(e){
            console.log('Error at sending the message:', e)
        }
    }

    const handleInputChange = (text: string) => {
        setText(text)
    }

  return (
    <BackgroundGradientTyping text={text}>
        <View style={[styles.container,{
            height: isFocused ? 40 : 50
        }]}>
                
            <View style={styles.textInputContainer}>

                {speechRecordingStatus === SpeechRecordingStatus.Recording 
                ? <RecordingSpeechAnimation></RecordingSpeechAnimation>
                : <TextInput 
                style={[styles.textInput, 
                    { height: isFocused ? 30 : 50 }
                ]} 
                multiline={true}
                placeholder='What do you want to say?'
                placeholderTextColor="white"
                aria-label='Write a prompt query'
                // verticalAlign='middle'
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
                name="send-circle" size={30} color="white" />
            </Pressable>
            
        </View>
    </BackgroundGradientTyping>

  )
}

const styles = StyleSheet.create({
    sendButton: {
        paddingHorizontal: 10,
        right: -20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 1,
        height: 50,
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
        height: 30,
        paddingRight: 50,
        paddingHorizontal: 5,
        paddingLeft: 10,
        // marginHorizontal: 3,
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    }
});