import React from 'react'
import { Text, StyleSheet} from 'react-native'

export const RecordingSpeechAnimation = () => {
  return (
    <>
        <Text style={styles.text}>Recording...</Text>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'sans-serif',
        justifyContent: 'center',
        margin: 'auto'
    }
})