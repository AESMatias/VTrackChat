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
        const response = await fetch(`${CHECK_UPDATE_URL}`);
        const data = await response.json();

        if (data.updateAvailable) {
            Alert.alert(
                data.mandatory ? "Update Required to continue" : "Update Available",
                `New version ${data.latestVersion} available. ${data.releaseNotes}`,
                data.mandatory
                    ? [{ text: "Update Now", onPress: () => Linking.openURL("market://details?id=com.aesmatias.vtrackapp") }]
                    : [
                          { text: "Later", style: "cancel" },
                          { text: "Update Now", onPress: () => Linking.openURL("market://details?id=com.aesmatias.vtrackapp") },
                      ]
            );
        }

        if (data.mandatory) {
            return false; // Return false if the update is mandatory, so the app doesn't continue.
        }

    } catch (error) {
        console.error("Error checking for updates:", error);
        return false;
    }
};