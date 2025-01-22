import { useEffect } from "react";
import { Alert, Linking } from "react-native";
// import * as Application from "expo-application"; //Expo version
import Constants from "expo-constants";

const SERVER_URL = process.env.SERVER_URL;
console.log(SERVER_URL);

const currentVersion = Constants?.manifest2?.extra?.expoClient?.version;
// const currentVersion = Application.nativeApplicationVersion; // Expo
const CHECK_UPDATE_URL = `http://${SERVER_URL}:3000/VTrackApp/android/versions/${currentVersion}/check-update`;

export const checkForUpdate = async () => {

    try {
        const response = await fetch(`${CHECK_UPDATE_URL}/${currentVersion}/check-update`);
        const data = await response.json();

        // console.error('la version actual es de la app en dispositivoo es: ', currentVersion);
        // console.error("infooooo", Object.keys(currentVersion)) //TODO: Delete this once the app is in production!

        if (data.updateAvailable) {
            Alert.alert(
                data.mandatory ? "Update Required" : "Update Available",
                `New version ${data.latestVersion} available. ${data.releaseNotes}`,
                data.mandatory
                    ? [{ text: "Update Now?", onPress: () => Linking.openURL("market://details?id=com.vtrackapp") }]
                    : [
                          { text: "Later", style: "cancel" },
                          { text: "Update Now", onPress: () => Linking.openURL("market://details?id=com.vtrackapp") },
                      ]
            );
        }

    } catch (error) {
        console.error("Error checking for updates:", error);
    }
};