// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { InitialChat } from '@/views/InitialChat';
// import LoginEntry from "@/components/LoginEntry";

// export type RootStackParams = {
//   LoginEntry: undefined;
//   InitialChat: undefined;
// }

// const Stack = createNativeStackNavigator<RootStackParams>();

// export const StackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: '#e47059e',
//         },
//     }}>
//         <Stack.Screen name="LoginEntry" component={LoginEntry} />
//         <Stack.Screen name="InitialChat" component={InitialChat} 
//         options={
//           {
//             title: 'Chat',
//             headerStyle: {
//               backgroundColor: '#e47059e',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }
//         }/>
//     </Stack.Navigator>
//   );
// };