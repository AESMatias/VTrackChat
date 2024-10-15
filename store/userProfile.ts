import { create } from 'zustand';

export enum SubscriptionPlan {
    Normal = 0,
    Premium = 1,
    PremiumPlus = 2,
  }

export type UserProfile = {
    username: string;
    currentPlan: SubscriptionPlan;
    tokens: number;
    loggedIn: boolean;

    updateProfileStatus: (newUsername: string, newPlan: number,
        newTokens: number, loggedIn: boolean) => void;
};

export const useUserProfileStore = create<UserProfile>()( (set, get) => ({

    username: '',
    currentPlan: SubscriptionPlan.Normal,
    tokens: 100,
    loggedIn: false,


    updateProfileStatus:(newUsername: string, newPlan: SubscriptionPlan,
        newTokens: number, loggedIn: boolean) => {
            set({ username: newUsername, currentPlan: newPlan,
                tokens: newTokens, loggedIn: loggedIn })
            }



}));