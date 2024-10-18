import { View, Text, TextInput, Pressable, Image, Animated, Easing,
  Platform, StyleSheet, ImageBackground
 } from 'react-native';
import React, { useState, useRef } from 'react';
import { generalColors } from '@/components/generalColors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { handleLoginFunc } from "@/utils/HandleLogin";


import { LoginAndNavigate, animateAndNavigate } from '@/views/login/Animations';
import { SubscriptionPlan, useUserProfileStore } from '@/store/userProfile';

const LoginEntry = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const scaleValue = useRef(new Animated.Value(1)).current;
  const scaleValueUsername = useRef(new Animated.Value(1)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const rotation = useRef(new Animated.Value(0)).current;
  const opacityLogin = useRef(new Animated.Value(0)).current;
  const opacityLoginText = useRef(new Animated.Value(1)).current;

  const topValueLogo = useRef(new Animated.Value(0)).current;

  const topValueLogoAnimation = Animated.timing(topValueLogo, {
    toValue: Platform.OS === 'web' ? -80 : -25,
    duration: 300,
    useNativeDriver: true,
  });

  const updateProfileStatus = useUserProfileStore( state => state.updateProfileStatus);

  const iluminateBorder = () => (username === "" && password === "" ? 'black' : 'cyan');

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const LOGOLINK = 'https://avatars.githubusercontent.com/u/119653204?v=4' //TODO: CHANGE

  const backgroundImageUri = Asset.fromModule(require('@/assets/images/back1.jpg')).uri;

  const handleLogin = async () => {

    const isUserLogged = await handleLoginFunc(username,password);

    await LoginAndNavigate(scaleValue, scaleValueUsername, 
      colorValue, circleScale, opacityValue, rotation, opacityLogin, opacityLoginText,
      topValueLogo, topValueLogoAnimation, isUserLogged);

    if (isUserLogged) {
      updateProfileStatus( username, SubscriptionPlan.Normal, 1222137, true);
      navigation.navigate('InitialChat');
    }
  }

    return (
      <View style={styles.container}>
      <ImageBackground
      source={{ uri: backgroundImageUri }}
      style={styles.backgroundImage}
      resizeMode="cover">

        {/* The Blur does not work well! */}
        <BlurView intensity={20} style={styles.overlay} >
        </BlurView>

        <View style={{
          // backgroundColor:'red',
          paddingVertical: 'auto',
          paddingHorizontal: '15%',
        }}>

          <Animated.View
            style={{
              flex: Platform.OS === 'web' ? 0.85 : 0.98,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: 'hsla(190, 50%, 12%,0.6)',
              zIndex: 1, // Ensure button is on top
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: iluminateBorder(),
              borderRadius: 5,
              paddingHorizontal: Platform.OS ==='web' ? 100 : 55,
              marginVertical: Platform.OS ==='web' ? 60 : 120,
              minHeight: 500,
              borderBottomLeftRadius: 100,
              borderTopRightRadius: 100,
            }}>
              <LinearGradient
                  // colors={['hsla(220, 0%, 0%,0)', 'hsla(190, 0%, 0%,0)']}
                  colors={['hsla(220, 90%, 35%,1)', 'hsla(190, 90%, 40%,1)', 'hsla(200, 10%, 80%,1)']}
                  style={[
                    Platform.OS === 'web' ? styles.gradient : styles.gradientMobile,
                    { borderRadius: 30 },
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >


            <Animated.Text 
                        style={[
                          styles.welcomeText,
                          {
                            opacity: opacityLoginText,
                          },]}>
                            Welcome to Matias Build
                </Animated.Text>

            <Animated.Image source={{ uri: LOGOLINK }} 
            style={[styles.imageLogo,{
              transform: [
                { translateY: topValueLogo },
                {scale: scaleValue},
              ],
            }]} >
              
            </Animated.Image>




          <Animated.View
            style={[
              ,
              {
                transform: [{ scale: scaleValueUsername }],
              },
            ]}
          >
              <TextInput
              placeholder="Your username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              />
          </Animated.View>


          <Animated.View
            style={[
              ,
              {
                opacity: opacityLoginText,
              },
            ]}
          >
            <TextInput
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </Animated.View>




            <Pressable onPress={handleLogin}
              
              style={({ pressed }) => [
                { 
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }] // Escala para efecto de presionado
                },
              ]}
            >


          <LinearGradient
                  colors={['hsl(195, 100%, 60%)', 'hsl(200, 100%, 50%)', 'hsl(220, 100%, 40%)']}
                  style={[styles.gradient, styles.loginButton]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  
                <Animated.Text 
                        style={[
                          styles.loginButtonText,
                          {
                            opacity: opacityLoginText,
                          },]}>
                            Login
                </Animated.Text>
          </LinearGradient>

                <Animated.View
            style={[
              styles.spinner,
              {
                transform: [{ rotate: rotateInterpolate }],
                opacity: opacityLogin,
              },
            ]}
          />
              </Pressable>

              <Animated.View style={[styles.circle,
              {
                transform: [{ scale: circleScale }],
                opacity: opacityValue,
                zIndex: -10, // Ensure circle is behind button
                
              }]}/>

              <Pressable onPress={ () => 
              {
                animateAndNavigate(scaleValue, colorValue, circleScale, opacityValue, navigation)}
              }
            style={
                {
                  marginTop: 5,
                  padding: 10,
                }
              }>

        <Animated.Text style={{ color: 'black', fontWeight: 'normal',
                      fontSize: 16,
                      paddingBottom: 5,
                      marginTop: 10,
                      fontStyle: 'italic',
                      opacity: opacityLoginText,
                    }}>
                      You're not a member yet?
                    </Animated.Text>

                <Animated.Text style={{ color: 'hsl(10, 90%, 40%)',
                  opacity: opacityLoginText,
                  fontWeight: '900',
                  fontSize: 20,
                  //alinear texto
                  textAlign: 'center',
                  
                }}>
                  Register
                </Animated.Text>
              </Pressable>
              
        </LinearGradient>
        
          </Animated.View>

      </View>

      </ImageBackground>  
      </View>
    )
}

export default LoginEntry

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,5,10,0.85)',
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientMobile: {
    paddingVertical:10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingVertical: 2,
  },
  loginButton: {
    margin : 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 180,
  },
  spinner: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "white",
    borderTopColor: "transparent",
    zIndex: 1,
    top: 17.5,
    left: 85,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden', // Ensure the circle does not overflow the container
    width: 'auto',
    height: 'auto',
  },
  circle: {
    position: 'relative',
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: generalColors.backgroundGeneral,
    zIndex: 0, // Ensure circle is behind button
  },
  input: {
    backgroundColor: generalColors.inputBackground,
    height: 40,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 160,
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageLogo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  buttonLogin: {
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
    marginVertical: -100,
    color: 'white',
  },
  });
  
