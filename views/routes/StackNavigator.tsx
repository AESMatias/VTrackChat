import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InitialChat } from '@/views/InitialChat';
import LoginEntry from "@/components/LoginEntry";


const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="InitialChat" component={InitialChat} />
        <Stack.Screen name="LoginEntry" component={LoginEntry} />
    </Stack.Navigator>
  );
};