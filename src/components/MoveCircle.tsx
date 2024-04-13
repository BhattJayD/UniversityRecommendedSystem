import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const {width, height} = Dimensions.get('window');

const MoveCircle = () => {
  const {styles} = useStyles(stylesheet);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const borderRadius = useSharedValue(360);

  const opacity = useSharedValue(0);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
      opacity: opacity.value,
      borderRadius: borderRadius.value,
    };
  });

  const moveRandomly = () => {
    opacity.value = withTiming(1, {duration: 5000});

    // Calculate the maximum allowed X and Y positions
    const maxX = width / 2; // 60 is the diameter of the circle
    const maxY = height / 2;

    // Generate random positions within the screen bounds
    const toX = Math.random() * maxX;
    const toY = Math.random() * maxY;

    // Generate a random scale between 0.5 and the maximum scale
    const newScale = 0.5 + Math.random();

    const newBorderRadius = Math.random() * 50;

    translateX.value = withTiming(toX, {
      duration: 1500,
      easing: Easing.inOut(Easing.cubic),
    });

    translateY.value = withTiming(toY, {
      duration: 1500,
      easing: Easing.inOut(Easing.cubic),
    });

    scale.value = withTiming(newScale, {
      duration: 1500,
      easing: Easing.inOut(Easing.cubic),
    });

    borderRadius.value = withTiming(newBorderRadius, {
      duration: 1500,
      easing: Easing.cubic,
    });
  };

  useEffect(() => {
    moveRandomly(); // Move once at component mount

    const intervalId = setInterval(moveRandomly, 1000); // Move every second

    return () => clearInterval(intervalId); // Clear interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={[styles.circleView, circleStyle]} />;
};
const stylesheet = createStyleSheet(theme => ({
  circleView: {
    backgroundColor: theme.colors.buttonColorDisable,
    height: 60,
    width: 60,
    // borderRadius: 360,
  },
}));

export default MoveCircle;
