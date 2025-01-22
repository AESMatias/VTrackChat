import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export  const AnimatedSocket = ({}) => {

    // const animations = Array.from({ length: 37 }, () => new Animated.Value(0));
    // The useRef avoids the re-rendering of the component when the father component re-renders
    const animations = useRef(Array.from({ length: 37 }, () => new Animated.Value(0))).current;

    const startAnimation = () => {
        animations.forEach((animation, index) => {
            let delayTime = 20; // Delay increases based on the index (you can adjust this value)
            let durationTime = 200; // Duration decreases with index (adjust as needed)


            if (index > 18){
                durationTime = 2000;
            }
            else if (index > 6){
                durationTime = 1500;
            }
            else if (index > 0){
                durationTime = 1250;
            }
            else{
                durationTime = 1000;
            }

            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: durationTime, // Each hexagon has a different duration
                        useNativeDriver: true,
                        delay: delayTime, // Each hexagon has a different delay
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: durationTime, // Each hexagon fades out over its own duration
                        useNativeDriver: true,
                        delay: delayTime, // Each hexagon has a different delay
                    }),
                ])
            ).start();
        });
    };

    React.useEffect(() => {
        startAnimation();
        console.log('animacio')
    }, []);

    // Calculate position for circular arrangement
    const getHexPosition = (index) => {
        
        const baseRadius = 15; // Base radius
        let radiusIncrement = 0; // Increase in radius per index
        let angle = (index * (360 / 37)) * (Math.PI / 180); // Angle for hexagon position in radians

        if (index > 18){
            radiusIncrement = 15; // Increase in radius per index
            angle = (index * (360 / 18)) * (Math.PI / 180);
        }
        else if (index > 6){
            radiusIncrement = 8; // Increase in radius per index
            angle = (index * (360 / 12)) * (Math.PI / 180);
        }
        else if (index > 0){
            radiusIncrement = 1; // Increase in radius per index
            angle = (index * (360 / 6)) * (Math.PI / 180);
        }

        let radius = baseRadius + radiusIncrement; // Dynamic radius based on index

        if (index === 0){
            radiusIncrement = 0;
            angle = 0;
            radius = 0;
        }

        const x = (radius+radiusIncrement) * Math.cos(angle); // X position
        const y = (radius+radiusIncrement) * Math.sin(angle); // Y position

        return {
            position: 'absolute',
            left: 20 + x, // Offset to center the hexagons horizontally
            top: 70 + y, // Offset to center the hexagons vertically
        };
    };

    return (
        <View style={styles.socket}>
            {animations.map((animation, index: number) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.hexBrick,
                        getHexPosition(index), // Get hexagon position
                        {
                            opacity: animation,
                            transform: [
                                {
                                    scale: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.2],
                                    }),
                                },
                            ],
                            backgroundColor: `hsl(205, 100%, ${index+35}%)`, // Varying colors
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    socket: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'absolute',
        top: '60%',
        right: '7.5%',
        transform:[{scale: 1.5}],
        alignSelf: 'center',
    },
    hexBrick: {
        width: 7,
        height: 7,
        borderRadius: 5,
    },
});