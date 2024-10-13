import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { queryOpenAI, queryOpenAIForImage } from '@/components/services/openAIQueries';

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
    streamStatus: streamStatusValues;
    setStreamStatus: (status: streamStatusValues) => void;
}

export const TypingZone = ({text,setMessages,setText,messages,setStreamStatus,streamStatus}:TypingZoneProps) => {


    const handleSendMessage = async () => {
        setMessages([...messages, text])
        try{
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
        <View>
            <TextInput onChangeText={handleInputChange}>
                <Text style={styles.inputText}>{text}</Text>
            </TextInput>
        </View>
        <Pressable style={styles.sendLogo}
        onPress={handleSendMessage}> 
            {/* TODO: This should be a personalized component */}
            <Text style={styles.sendLogo}>SEND!</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        color: 'white',
    },
    sendLogo: {
        color: 'white',
        fontSize: 32,
    }
});