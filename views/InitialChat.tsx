import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MessageItem } from '@/components/MessageItem'
import { TypingZone } from '@/components/TypingZone'
import { AnimatedSocket } from '@/components/AnimatedSocket';
// import { initDatabase, insertQuery} from '@/components/services/SQLite/SQLite'
import { QueryInterface } from '@/components/services/SQLite/types'
// import { getEmbedding } from '@/components/services/openAIQueries'
import { useUserProfileStore } from '@/store/userProfile'
import { BlurView } from 'expo-blur'
import { generalColors } from '@/components/generalColors'
import {checkForUpdate} from '@/utils/checkAppVersion';
import { Asset } from 'expo-asset';

export const InitialChat = () => {

    const [dataFetched, setDataFetched] = useState<QueryInterface[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isMicrophoneListening, setIsMicrophoneListening] = useState(false);

    const [text, setText] = useState<string>('');
    const [messages, setMessages] = useState<string[]>(['']);
    const [currentImage, setCurrentImage] = useState('');
    const flatListRef = useRef(null);

    const username = useUserProfileStore(state => state.username);
    const currentPlan = useUserProfileStore(state => state.currentPlan);
    const tokens = useUserProfileStore(state => state.tokens);
    const loggedIn = useUserProfileStore(state => state.loggedIn);
    const speechRecordingStatus = useUserProfileStore(state => state.speechRecordingStatus);


    const senderImageUrl = Asset.fromModule(require('@/assets/images/VTrackLogo.png')).uri;
    const senderUsername = username;

    const datatoPUT = [
        {
            id: 1,
            username: 'senderUSERNAMEEEE',
            senderAccountType: 0,
            message: 'Hello',
            senderImageUrl: 'https://avatars.githubusercontent.com/u/119653204?v=4'
        },
        {
            id: 2,
            username: 'senderUSERNAMEEEE',
            senderAccountType: 0,
            message: 'Hi',
            senderImageUrl: 'https://avatars.githubusercontent.com/u/119653204?v=4'
        },
    ]

    useEffect(() => {

        const updateResult = checkForUpdate();

        if (!updateResult) {
            throw new Error('Error checking for updates')
        }

        setDataFetched( () => datatoPUT);

        try{
            // initDatabase();
        } catch (error){
            console.error('Error initializing the database', error)
        }

    }, [])

    // useEffect(() => {
    //     flatListRef?.current?.scrollToEnd({ animated: true });
    // }, [speechRecordingStatus, dataFetched])


    const processQuery = async (query: string) => {

        let queryObject = { //TODO: Change this!
            queryText: query,
            date: new Date(),
            category: 'general',
            summary: 'summary',
            context: 'context',
            embeddings: [],
            tags: ['tag1', 'tag2', 'tag3'],
            senderImageUrl: 'https://avatars.githubusercontent.com/u/119653204?v=4',
            username:'senderUSERNAme'
        }

        try {
            // const embeddingResponse = await getEmbedding(queryObject.queryText);
            // queryObject.embeddings = embeddingResponse;

            // Insert the query into the SQLite database
            // await insertQuery(queryObject);

        } catch (error) {
            console.error('Error processing query in initial chat tsx:', error)
        }
    }


    useEffect(() => {
        // console.log('NEW MESSAGE!', dataFetched.length)

        console.log('Messages:', dataFetched[dataFetched.length-1])
        //TODO: For now, we use the last message to send to the server, but it is
        //not the last! Should be solved!

        //TODO: We should filter in order to gather only the messages that come from the user!
        // processQuery(dataFetched[dataFetched.length-1]?.text)

        //actualizamos datafetch
        setDataFetched([...dataFetched, {id: dataFetched.length+1,
            message: messages[messages.length-1],
             senderImageUrl,
             senderUsername,
            }])

        setTimeout(() => { // To scroll to the end of the list every time a new message is sent or received
                flatListRef?.current?.scrollToEnd({ animated: true });
        }, 10); // 10ms
        
    },[messages])
    
    // const lastMessage = messages[messages.length - 1];

  return (
    <SafeAreaView style={styles.container}>

    <BlurView intensity={20} style={styles.overlay} >
    </BlurView>
    

    {/* {dataFetched && dataFetched.length < 4 ? (<AnimatedSocket key="animatedSocket"/>) : null} */}

    { speechRecordingStatus === 1
    ? (< View style={styles.containerSocket}>
        <AnimatedSocket key="animatedSocket"/>
        </View>
    )
    :   (<View style={styles.flatlistContainer}>
        <FlatList
            ref={flatListRef} // To scroll to the end of the list every time a new message is sent or received
            data={ (dataFetched !== null) ? dataFetched : [] }
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={
                ({ item }) => <MessageItem itemData={item}/>
            }
            style={styles.char_list}
            indicatorStyle='white' // Only works on iOS!
            refreshing={refreshing}
            onRefresh={(refreshing) => setRefreshing(!refreshing)}
            showsVerticalScrollIndicator={true}
            maxToRenderPerBatch={20} // Render 50 elements per batch
            initialNumToRender={20} // Render 100 elements when the component is mounted
            windowSize={20} // Hold 20 elements in memory
            removeClippedSubviews={true} // Not render elements that are not in the screen
        />
        </View>)
    }

    <TypingZone text={text} 
    setText={setText} 
    messages={messages} 
    setMessages={setMessages}
    isMicrophoneListening={isMicrophoneListening}
    setIsMicrophoneListening={setIsMicrophoneListening}
    />


</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: generalColors.chatBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerSocket: {
        flex: 1,
        backgroundColor: 'orange',
    },
    char_list: {
        width: '100%',
        maxHeight:'95%',
        // flex:2,
        minWidth: '97%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(5,5,10,0.5)',
    },
    flatlistContainer:{
        flex:1,
    }
})