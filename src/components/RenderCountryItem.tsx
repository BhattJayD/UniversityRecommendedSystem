import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type itemType = {
  item: {id: number; name: string; url: number};
  onPress: () => void;
  isSelected: boolean;
};
const RenderCountryItem = ({item, onPress, isSelected}: itemType) => {
  const {styles} = useStyles(stylesheet);
  // Randomize initial positions and animation properties
  const initialTranslateY = Math.random() * 1000; // Randomly between 0 and 1000
  const initialTranslateX = Math.random() * 600 - 300; // Randomly between -300 and 300
  const duration = 1000 + Math.random() * 1000; // Between 1000 and 2000 milliseconds
  const easing = Easing.inOut(Easing.ease); // You can also randomize easing functions

  const translateY = useSharedValue(initialTranslateY); // Start offscreen
  const translateX = useSharedValue(initialTranslateX); // Start offscreen

  const itemAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
      ],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(0, {duration, easing}); // Animate to 0 when component mounts
    translateX.value = withTiming(0, {duration, easing}); // Animate to 0 when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.itemStyle,
          itemAnimatedStyle,
          isSelected && styles.selectedItem,
        ]}>
        <View style={styles.countryView}>
          <Image
            source={item.url}
            style={styles.countryIcon}
            resizeMode="contain"
          />
        </View>
        <Text>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default RenderCountryItem;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
  abs: {
    position: 'absolute',
  },
  headingTxt: {
    fontSize: 24,
    color: theme.colors.textColorHq,
    fontWeight: '600',
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: theme.colors.lightWhite,
    borderRadius: 10,
  },
  selectedItem: {backgroundColor: theme.colors.buttonColorDisable},
  countryView: {
    backgroundColor: theme.colors.buttonColor,
    marginRight: 10,
    borderRadius: 100,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryIcon: {height: 44, width: 44},
}));
