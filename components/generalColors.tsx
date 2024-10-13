import BackgroundGradient from "@/components/BackgroundGradient";
import { LinearGradient } from 'expo-linear-gradient';

export const colors = {
    // inputBackground: 'rgb(230, 238, 245)',
    primary: '#1e50bb',
    background: '#032843',
    backgroundDense: 'rgb(2, 15, 25)',
    // inputBackground: 'rgba(30, 140, 250,0.15)',
    inputBackground: 'hsl(190, 50%, 90%)',
    backgroundGeneral: 'hsl(210, 100%, 4%)',
    // inputBackground: 'rgba(30, 140, 250,0.15)',
    promptPanel: '#1e90ff',
    gray: '#C5C4C6',
    mediumGray: '#F6F6FB',
    lightGray: 'hsl(200, 60%, 90%)',
    lightGrayInput: 'hsl(190, 15%, 80%)',
    BackgroundGradient: () => <BackgroundGradient />,
    ticketBackground: 'hsla(200, 65%, 90%, 1)',
};