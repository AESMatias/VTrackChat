import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, ActivityIndicator, StyleSheet, Button } from 'react-native'
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

export const Settings = () => {

    const senderImageUrl = Asset.fromModule(require('@/assets/images/VTrackLogo.png')).uri;
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentProfilePictureURL, setCurrentProfilePictureURL] = useState(senderImageUrl);

    const { username, currentPlan, tokens, loggedIn, token_user, speechLanguage, profilePictureURL, updateProfileStatus, updateSpeechLanguage } = useUserProfileStore();

    const apiUrl = process.env.SERVER_URL;

    useEffect(() => {
        
        setCurrentLanguage(speechLanguage);

        // try{
        //     // initDatabase();
        // } catch (error){
        //     console.error('Error retrieving the user language preference:', error)
        // }

    }, []);

    const handleLanguageChange = async (language: string) => {

        if(language !== currentLanguage){
            updateSpeechLanguage(language);
            setCurrentLanguage(language);
        }

        try{

        // Send a POST request to the API to update the user language preference
        console.error('realizando peticion ocn', 'lenguaje', language,token_user)

        const response = await fetch(`http://${apiUrl}:3000/auth/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_user}`,
            },
            body: JSON.stringify({
                speechLanguage: language,
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update language');
        }

        // Update the user profile in the store after the API call is successful
        updateSpeechLanguage(language);
        console.log('Language updated successfully!');

        } catch (error){
            console.error('Error updating the user language preference:', error)
        }
    }

    return (
    <SafeAreaView style={styles.container}>

    <BlurView intensity={20} style={styles.overlay} >
    </BlurView>



     <View style={styles.flatlistContainer}>

        <Text style={styles.languageTitle}>{`Speech Recognition Language seted to ${(currentLanguage === 'es') ? 'Español' : 'English'}`}</Text>

        <View style={styles.languageButtons}>
            <Button 
                title="English" 
                onPress={() => handleLanguageChange('en')}
                color={generalColors.typingZoneInput}
            />
            <Button 
                title="Español"
                onPress={() => handleLanguageChange('es')} 
                color={generalColors.typingZoneInput}
            />

        </View>

    </View>


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
    },
    languageTitle: {
        fontSize: 20,
        color: 'white',
        margin: 10,        
    },
    languageButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
})