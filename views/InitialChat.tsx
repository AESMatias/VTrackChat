import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MessageItem } from '@/components/MessageItem'
import { TypingZone } from '@/components/TypingZone'
import { AnimatedSocket } from '@/components/AnimatedSocket';


enum streamStatusValues {
    WRITING = "writing",
    SENDED = "sended",
    STREAMING = "STREAMING",
    FINISHED = "finished", // This means that the stream of data has not started yet
    ERROR = "error",
}

export const InitialChat = () => {

    const [dataFetched, setDataFetched] = useState<{ id: number; text: string; }[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    const [text, setText] = useState('Hello, can you tell me something interesting? Be quick! Not much text')
    const [streamStatus, setStreamStatus] = useState(streamStatusValues.FINISHED)
    const [messages, setMessages] = useState([])
    const [currentImage, setCurrentImage] = useState('');
    const flatListRef = useRef(null);

    const handlePress = () => {
        console.log('Pressed')
    }
    const datatoPUT = [
        {
            id: 1,
            text: 'Hello',
        },
        {
            id: 2,
            text: 'Hi',
        },
        {
            id: 3,
            text: 'Bye',
        },
    ]

    useEffect(() => {
        setDataFetched( () => datatoPUT)
        
    }, [])

    useEffect(() => {
        console.log('NEW MESSAGE!', dataFetched.length)
        //actualizamos datafetch
        setDataFetched([...dataFetched, {id: dataFetched.length+1, text: messages[messages.length-1]}])

        setTimeout(() => { // To scroll to the end of the list every time a new message is sent or received
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 10); // 10ms
        
    },[messages])
    
    const lastMessage = messages[messages.length - 1];

  return (
    <SafeAreaView style={styles.container}>
    {dataFetched && dataFetched.length < 5 ? (<AnimatedSocket key="animatedSocket"/>) : null}
    {/* <StatusBar style='dark' /> */}
            <FlatList
                ref={flatListRef} // To scroll to the end of the list every time a new message is sent or received
                data={(dataFetched !== null) ? dataFetched : []
                }
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={
                    ({ item }) => 
                        <MessageItem message={item.text} 
                    onPress={() => handlePress()}
                    charData={item}/>
            }
                style={styles.char_list}
                refreshing={refreshing}
                onRefresh={(refreshing) => setRefreshing(!refreshing)}
                showsVerticalScrollIndicator={true}
                maxToRenderPerBatch={20} // Render 50 elements per batch
                initialNumToRender={20} // Render 100 elements when the component is mounted
                windowSize={20} // Hold 20 elements in memory
                removeClippedSubviews={true} // Not render elements that are not in the screen
            />
            <TypingZone text={text} setText={setText} setStreamStatus={setStreamStatus}
            streamStatus={streamStatus} messages={messages} 
            setMessages={setMessages}/>

</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    char_list: {
        width: '100%',
        height: '100%',
    },
})