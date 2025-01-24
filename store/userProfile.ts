import { create } from 'zustand';

export enum SubscriptionPlan {
    Normal = 0,
    Premium = 1,
    PremiumPlus = 2,
  }

export enum SpeechRecordingStatus {
    Inactive = 0,
    Recording = 1,
    Error = 2,
}

export type UserProfile = {
    username: string;
    currentPlan: SubscriptionPlan;
    tokens: number;
    loggedIn: boolean;
    token_user: string;
    speechLanguage: string;
    profilePictureURL: string;

    updateProfileStatus: (newUsername: string, newPlan: number,
        newTokens: number, loggedIn: boolean, token_user: string, speechLanguage: string, profilePictureURL: string) => void;

    speechRecordingStatus: SpeechRecordingStatus;
    updateSpeechRecordingStatus: (newStatus: SpeechRecordingStatus) => void;

    updateSpeechLanguage: (newLanguage: string) => void;
    updateProfilePictureURL: (newURL: string) => void;

};

export const useUserProfileStore = create<UserProfile>()( (set, get) => ({

    username: '',
    token_user: '',
    currentPlan: SubscriptionPlan.Normal,
    tokens: 100,
    loggedIn: false,
    speechRecordingStatus: SpeechRecordingStatus.Inactive,
    speechLanguage: 'en',
    profilePictureURL: '',


    updateProfileStatus:(newUsername: string, newPlan: SubscriptionPlan,
        newTokens: number, loggedIn: boolean, token: string, speechLanguage: string, profilePictureURL: string) => {
            set({ 
                username: newUsername, 
                currentPlan: newPlan,
                tokens: newTokens, 
                loggedIn: loggedIn,
                token_user: token,
                speechLanguage: speechLanguage,
                profilePictureURL: profilePictureURL
            })
    },

    updateSpeechRecordingStatus: (newStatus: SpeechRecordingStatus) => {
        set({ speechRecordingStatus: newStatus }); // Update only the speech recording status
    },

    updateTokenUser: (newToken: string) => {
        set({ token_user: newToken }); // Update only the speech recording status
    },

    updateSpeechLanguage: (newLanguage: string) => {
        set({ speechLanguage: newLanguage }); // Update only the speech recording status
    },
    
    updateProfilePictureURL: (newURL: string) => {
        set({ profilePictureURL: newURL }); // Update only the speech recording status
    }

}));