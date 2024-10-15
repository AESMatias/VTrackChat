import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MessageItem } from '@/components/MessageItem'
import { TypingZone } from '@/components/TypingZone'
import { AnimatedSocket } from '@/components/AnimatedSocket';
import { initDatabase, insertQuery} from '@/components/services/SQLite/SQLite'
import { QueryInterface } from '@/components/services/SQLite/types'
import { getEmbedding } from '@/components/services/openAIQueries'
import { useUserProfileStore } from '@/store/userProfile'


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

    const username = useUserProfileStore(state => state.username)
    const currentPlan = useUserProfileStore(state => state.currentPlan)
    const tokens = useUserProfileStore(state => state.tokens)
    const loggedIn = useUserProfileStore(state => state.loggedIn)

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
        try{
            initDatabase();
        } catch (error){
            console.log('Error in the database', error)
        }
    }, [])


    const processQuery = async (query: string) => {

        let queryObject = {
            queryText: query,
            date: new Date(),
            category: 'general',
            username: 'user',
            summary: 'summary',
            context: 'context',
            embeddings: [],
            tags: ['tag1', 'tag2', 'tag3'],
        }

        try {
            const embeddingResponse = await getEmbedding(queryObject.queryText);
            queryObject.embeddings = embeddingResponse;

            // Insert the query into the SQLite database
            insertQuery(queryObject);

        } catch (error) {
            console.error('Error processing query in initial chat tsx:', error)
        }
    }


    useEffect(() => {
        // console.log('NEW MESSAGE!', dataFetched.length)

        console.warn('Messages:', dataFetched[dataFetched.length-1])
        //TODO: For now, we use the last message to send to the server, but it is
        //not the last! Should be solved!

        //TODO: We should filter in order to gather only the messages that come from the user!
        processQuery(dataFetched[dataFetched.length-1]?.text)

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