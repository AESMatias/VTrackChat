import React from 'react'
import { View, Text, TextInput, Pressable, Image, Animated, Easing,
  Platform, StyleSheet
 } from 'react-native';
import { useState, useRef } from 'react';
import { colors } from '@/components/generalColors';
import { LinearGradient } from 'expo-linear-gradient';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

import handleLoginFunc from '@/components/HandleLogin';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';




const LoginEntry = () => {

  const navigation = useNavigation();

  // useFocusEffect( // Use useFocusEffect for proper cleanup
  //   React.useCallback(() => {
  //       navigation.getParent()?.setOptions({ swipeEnabled: false });

  //       return () => {  // IMPORTANT: Restore swipeEnabled when leaving the screen
  //           navigation.getParent()?.setOptions({ swipeEnabled: true });
  //       };
  //   }, [navigation])
  // );


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

  const animateAndNavigate = () => {
    // Define animations
    const scaleAnimation = Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    });

    const colorAnimation = Animated.timing(colorValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false, // For color changes
    });

    const circleAnimation = Animated.timing(circleScale, {
      toValue: 300, // Scale up the circle
      duration: 600,
      useNativeDriver: true,
    });

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue: 1, // Fade in the circle
      duration: 400,
      useNativeDriver: true,
    });
    

    // Run animations in sequence
    Animated.sequence([
      Animated.parallel([
        scaleAnimation,
        colorAnimation,
        Animated.parallel([
          circleAnimation,
          opacityAnimation,
        ]),
      ]),
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: false,
        }),
        Animated.timing(circleScale, {
          toValue: 500, // Reset the circle size
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1, // Fade out the circle
          duration: 150,
          useNativeDriver: true,
        })
      ]),
    ]).start(() => {
      // Navigate after animations complete
      // router.navigate("/home");
      navigation.navigate('InitialChat');

      // Reset animation values after a delay
      setTimeout(() => {
        scaleValue.setValue(1);
        colorValue.setValue(0);
        circleScale.setValue(1);
        opacityValue.setValue(0);
      }, 600); // Adjust delay as needed
    });
};


  const topValueLogo = useRef(new Animated.Value(0)).current;

  const topValueLogoAnimation = Animated.timing(topValueLogo, {
    toValue: Platform.OS === 'web' ? -80 : -25,

    duration: 300,
    useNativeDriver: true,
  });

  const LoginAndNavigate = (isUserLogged: boolean) => {

    const scaleAnimation = Animated.timing(scaleValue, {
      toValue: Platform.OS === 'web' ? 1.6 : 0.8,
      useNativeDriver: true,
      duration: 300,
    });

    const scaleAnimationUsername = Animated.spring(scaleValueUsername, {
      toValue: 2,
      useNativeDriver: true,
    });

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(opacityLogin, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityLoginText, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    

    const circleAnimation = Animated.timing(circleScale, {
      toValue: 300, // Scale up the circle
      duration: 600,
      useNativeDriver: true,
    });

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue: 1, // Fade in the circle
      duration: 400,
      useNativeDriver: true,
    });

    if (!isUserLogged) {
      setTimeout(() => {
        // router.navigate("/views/Login");
        scaleValue.setValue(1);
        scaleValueUsername.setValue(1);
        colorValue.setValue(0);
        circleScale.setValue(1);
        opacityValue.setValue(0);

        rotation.setValue(0);
        opacityLogin.setValue(0);
        opacityLoginText.setValue(1);
        topValueLogo.setValue(0);
      }, 2000); // Adjust delay as needed
      return;
    }
    // Run animations in sequence
    Animated.sequence([
      Animated.parallel([
        Animated.parallel([
          circleAnimation,
          opacityAnimation,
          scaleAnimation,
          topValueLogoAnimation,
          scaleAnimationUsername,
        ]),
      ]),
      // Animated.parallel([
      //   Animated.timing(circleScale, {
      //     toValue: 500, // Reset the circle size
      //     duration: 300,
      //     useNativeDriver: true,
      //   }),
      // ]),
    ]).start(() => {
      if (handleLoginFunc({username,password})) {
        // Navigate after animations complete
        // router.navigate("/home");
          // Reset animation values after a delay
          setTimeout(() => {
            // router.navigate("/views/Login");
            scaleValue.setValue(1);
            scaleValueUsername.setValue(1);
            colorValue.setValue(0);
            circleScale.setValue(1);
            opacityValue.setValue(0);
      
            rotation.setValue(0);
            opacityLogin.setValue(0);
            opacityLoginText.setValue(1);
            topValueLogo.setValue(0);
          }, 600); // Adjust delay as needed
        
      }
      else{
        // Reset animation values after a delay
        setTimeout(() => {
          // router.navigate("/views/Login");
          scaleValue.setValue(1);
          scaleValueUsername.setValue(1);
          colorValue.setValue(0);
          circleScale.setValue(1);
          opacityValue.setValue(0);
          rotation.setValue(0);
          opacityLogin.setValue(0);
          opacityLoginText.setValue(1);
          topValueLogo.setValue(0);
          alert("Invalid credentials");
        }, 3000); // Adjust delay
      }
    });
  };

  const iluminateBorder = () => {
    if (username === "" && password === "") {
      return 'black';
    }
    return 'cyan';
  }

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const buttonColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.lightGray, 'cyan'], // Tomato to Green
  });

  const borderColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', 'cyan'], // Tomato to Green
  });

  const LOGOLINK = 'https://avatars.githubusercontent.com/u/119653204?v=4' //TODO: CHANGE
  const backgroundImageLINK = require('../assets/images/Entrybackground.jpg') //TODO: CHANGE;

    return (
      <View style={styles.container}>
        {/* <Stack.Screen         options={{
            headerShown: false,

          }} />
          */}

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




          <Pressable onPress={() => {
            const isUserLogged = handleLoginFunc({username,password});
        LoginAndNavigate(isUserLogged);
    }}
            
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

            <Pressable onPress={animateAndNavigate}
            >
                        <Ionicons name="logo-google-playstore" size={24} color="black" />
            </Pressable>

            <Pressable onPress={animateAndNavigate} style={
              {
                marginTop: 5,
                padding: 10,
              }
            }
            >

      <Animated.Text style={{ color: 'black', fontWeight: 'normal',
                    fontSize: 16,
                    paddingBottom: 5,
                    marginTop: 10,
                    fontStyle: 'italic',
                    opacity: opacityLoginText,
                  }}>
                    You are not a member yet?
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
            


            {
              Platform.OS === 'web' ? (
                <View style={{ 
                  height: 300, 
                  width: 800,
                  filter: 'blur(200px)',
                  backgroundColor: 'hsl(210, 90%, 70%)', 
                  position:'absolute', 
                  opacity: 0.75,
                  zIndex: -10,
                    }} />):
                    (null)
              }

      </LinearGradient>
      
        </Animated.View>

      </View>
    )
}

export default LoginEntry

const styles = StyleSheet.create({
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
      left: 68,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: 'hidden', // Ensure the circle does not overflow the container
      backgroundImage: 'url(../assets/images/background1.png)',
      backgroundSize: 'cover',
      width: '100%',
    },
    circle: {
      position: 'relative',
      width: 10,
      height: 10,
      borderRadius: 100,
      backgroundColor: colors.backgroundGeneral,
      top: '0%',
      left: '0%',
      zIndex: 0, // Ensure circle is behind button
    },
    input: {
      backgroundColor: colors.inputBackground,
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
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.8)',
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
      fontSize: 18,
      // lo mas bold posible
      fontWeight: '900',
      marginBottom: 10,
      marginVertical: -100,
      color: 'white',
    },
  });
  
