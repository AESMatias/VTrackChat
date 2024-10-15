import { Animated, Easing, Platform } from "react-native";


export const LoginAndNavigate = async (
    scaleValue: Animated.Value, 
    scaleValueUsername: Animated.Value, colorValue: 
    Animated.Value, circleScale: Animated.Value, 
    opacityValue: Animated.Value, rotation: Animated.Value, 
    opacityLogin: Animated.Value, opacityLoginText: Animated.Value, 
    topValueLogo: Animated.Value, topValueLogoAnimation: Animated.Value,
    userIsLogged: boolean
) => {

    return new Promise( (resolve, reject) =>{

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

    if (!userIsLogged) {
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
        }, 500); // Adjust delay
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

      if (userIsLogged) {
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
            resolve(true); //Resolve the promise after 
          }, 300); // Adjust delay as needed
      }

    });

  });

  };

export const animateAndNavigate = (
    scaleValue: Animated.Value, colorValue: Animated.Value,
     circleScale: Animated.Value, opacityValue: Animated.Value,
     navigation: any //TODO: Type this
) => {
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
      // Reset animation values after a delay
      setTimeout(() => {
        scaleValue.setValue(1);
        colorValue.setValue(0);
        circleScale.setValue(1);
        opacityValue.setValue(0);
      }, 5000); // Adjust delay as needed
    });
};