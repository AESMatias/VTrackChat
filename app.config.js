export default {
  "expo": {
    "name": "VTrackChat",
    "slug": "VTrackChat",
    "version": "2.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.veritres.VTrackChat"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-asset", 
      "@react-native-voice/voice"
    ],
    "extra": {
      "eas": {
        "projectId": "f4a9661c-a7a9-4488-a615-cf2158af2b56"
      }
    }
  }
}