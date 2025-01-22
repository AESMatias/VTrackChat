import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginEntry from "@/views/login/LoginEntry";
import { SideDrawer } from '@/views/routes/SideDrawer';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <NavigationContainer>
    <SideDrawer />
      {/* <LoginEntry /> */}
      <StatusBar style='dark'/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(170, 100%, 70%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
