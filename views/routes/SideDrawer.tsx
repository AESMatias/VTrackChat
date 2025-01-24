import { InitialChat } from '@/views/InitialChat';
import { Settings } from '@/views/Settings';
import LoginEntry from "@/views/login/LoginEntry";
import { createDrawerNavigator, DrawerContentComponentProps,
    DrawerContentScrollView, DrawerItemList, DrawerItem
 } from '@react-navigation/drawer';
import { View, StyleSheet, Image} from 'react-native';
import { generalColors } from '@/components/generalColors';

export type RootStackParams = { //TODO: Solve this
  LoginEntry: undefined;
  InitialChat: undefined;
  Settings: undefined;
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Image source={require('@/assets/images/VTrackLogo.png')} style={styles.logo}/>
            </View>

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
        headerTitleStyle: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: '45%',
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: generalColors.backgroundGeneralHeader,
        },
        headerTintColor: 'white',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: generalColors.backgroundGeneral,
          width: 200,
          borderWidth: 0,
          borderColor: 'transparent',
          borderRadius: 5,
        },
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: generalColors.typingZoneInput,
        drawerInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        drawerInactiveBackgroundColor: generalColors.typingZoneInput,
        drawerItemStyle: {
            borderRadius: 5,
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

        <Drawer.Screen name="Settings" component={Settings}
                options={{ headerShown: true }}
        />

    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        marginLeft: 80,
        borderWidth: 1,
        borderColor: 'white',
    },
});