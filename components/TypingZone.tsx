import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native'
import { queryOpenAI, queryOpenAIForImage } from '@/components/services/openAIQueries';
import { VoiceRecognitionButton } from '@/components/VoiceRecognition'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SpeechRecordingStatus, useUserProfileStore } from '@/store/userProfile';
import { RecordingSpeechAnimation } from '@/components/RecordingSpeechAnimation';
import { BackgroundGradientTyping } from '@/components/BackgroundGradient';
import { DeleteButton } from '@/components/DeleteButton';
import { Vibration } from 'react-native';
import { KeyboardState } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import { generalColors } from './generalColors';


interface TypingZoneProps {
    text: string;
    setText: (text: string) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
    isMicrophoneListening: boolean;
    setIsMicrophoneListening: (isListening: boolean) => void;
}


export const TypingZone = ({text, setMessages, setText, messages}: TypingZoneProps) => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    const speechRecordingStatus = useUserProfileStore(state => state.speechRecordingStatus);
    const token_user = useUserProfileStore(state => state.token_user);

    useEffect(() => {
        // Listener for keyboard hide event
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(false);
        });

        // Cleanup the listener on component unmount!
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleSendMessage = async () => {
        // setMessages([...messages, text])
        setMessages(prevMessages => [...prevMessages, text]);
        try{
            setKeyboardVisible(true);
            Keyboard.dismiss();
            Vibration.vibrate(10);
            setText('');
            const queryResponse = await queryOpenAI(text, messages as [], token_user);

            if (!queryResponse?.result?.choices?.[0]?.message?.content) {
                console.error("Invalid response structure", queryResponse);
                return;
            }

            const parsedResponse = String(queryResponse.result.choices[0].message.content)
            setMessages(prevMessages => [...prevMessages, parsedResponse]);
        }catch(e){
            console.log('Error at sending the message:', e)
        }
    }

    const handleAddFile = async () => {
        try{
            Vibration.vibrate(10);
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
            height: isKeyboardVisible ? 40 : 50
        }]}>
                
            {(isKeyboardVisible && speechRecordingStatus === 0)
            ? (<Pressable style={styles.addFileButton} onPress={handleAddFile}> 
                <AntDesign name="pluscircleo" size={25} color={generalColors.addFileButton}/>
            </Pressable>)
            :null}

            <View style={styles.textInputContainer}>

                {speechRecordingStatus === SpeechRecordingStatus.Recording 
                ? <RecordingSpeechAnimation></RecordingSpeechAnimation>
                : (<TextInput 
                style={[styles.textInput, 
                    { height: isKeyboardVisible ? 30 : 50 }
                ]} 
                multiline={true}
                placeholder='What do you want to ask?'
                placeholderTextColor="white"
                aria-label='Write a prompt query'
                onChangeText={handleInputChange}>
                    <Text>{text}</Text>
                </TextInput>
                )}

            </View>

            <DeleteButton text={text} setText={setText}/>
            
            {(text==='' && isKeyboardVisible)
            ? (<View>
                <VoiceRecognitionButton setText={setText}/>
            </View>)
            : (<Pressable style={styles.sendButton} onPress={handleSendMessage}>
            {/* TODO: This should be a personalized component */}
            <MaterialCommunityIcons
            name="send-circle" size={30} color="white"/>
        </Pressable>)}
            

            
        </View>
    </BackgroundGradientTyping>

  )
}

const styles = StyleSheet.create({
    sendButton: {
        paddingVertical:5,
        paddingHorizontal: 10,
        right: -10,
    },
    addFileButton: {
        paddingVertical:5,
        paddingHorizontal: 5,
        right: 5,
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
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,

        // width:'100%',
        // alignSelf:'center',
    }
});