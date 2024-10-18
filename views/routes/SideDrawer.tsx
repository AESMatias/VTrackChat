import { InitialChat } from '@/views/InitialChat';
import LoginEntry from "@/views/login/LoginEntry";
import { createDrawerNavigator, DrawerContentComponentProps,
    DrawerContentScrollView, DrawerItemList, DrawerItem
 } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';

export type RootStackParams = {
  LoginEntry: undefined;
  InitialChat: undefined;
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.logo}/>

            <DrawerItemList {...props} />
            {/* <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
            /> */}

        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator<RootStackParams>();

export const SideDrawer = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'cyan',
        },
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 200,
        },
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: 'red',
        drawerInactiveTintColor: 'black',
        drawerInactiveBackgroundColor: 'green',
        drawerItemStyle: {
            borderRadius: 15,
            marginVertical: 5,
            },
        drawerContentContainerStyle: {
            marginVertical: 'auto',
            },
        drawerLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            },
            
    }}

    drawerContent={props => {
        return (<CustomDrawerContent {...props} />);
    }}>

        <Drawer.Screen name="LoginEntry" component={LoginEntry} 
        options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }, // Hide the drawer item
            swipeEnabled: false, // Disable swipe to open the drawer
        }}
           />

        <Drawer.Screen name="InitialChat" component={InitialChat}
        options={{ headerShown: true }}
        />

    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        backgroundColor: 'yellow',
    },
});