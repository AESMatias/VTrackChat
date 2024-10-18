import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import { useUserProfileStore } from '@/store/userProfile';

interface Children {
  children: React.ReactNode;
  text: string;
}

export const BackgroundGradientTyping = ({children, text}: Children) => {

  const speechRecordingStatus = useUserProfileStore(state => state.speechRecordingStatus)
console.log(speechRecordingStatus, 'textO>',text)
  return (
    <LinearGradient
    colors={['hsla(190, 100%, 40%, .2)', 'hsla(210, 100%, 30%, 1)', 'hsla(220, 100%, 5%, .8)']}
    style={[styles.gradient, {

      borderTopLeftRadius: ((text !== '') || (text === '' && speechRecordingStatus === 1)) ? 0: 15,

      borderTopRightRadius: ((text !== '') || (text === '' && speechRecordingStatus === 1)) ? 0: 15,

      borderTopWidth: (text !== '' || speechRecordingStatus === 1) ? .5: 0,

     }]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    >
      {children}

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderTopLeftRadius: 15,
    borderTopColor:'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});