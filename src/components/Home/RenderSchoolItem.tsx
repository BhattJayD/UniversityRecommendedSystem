import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const RenderSchoolItem = ({item, viewableItems}: any) => {
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
    <Animated.View style={[styles.itemView, itemAnimatedStyle]}>
      <Image
        source={{
          uri: 'https://assets.leverageedu.com/school-logo/' + item.school_logo,
        }}
        style={styles.schoolLogo}
      />
      <View>
        <Text style={styles.schoolTxt}>{item.school_name}</Text>
        <Text style={styles.schoolTxt}>
          Establish in Year {item.establish_year}
        </Text>
      </View>
    </Animated.View>
  );
};
export default RenderSchoolItem;
const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
  headingTxt: {
    color: theme.colors.textColorHq,
  },
  itemView: {
    borderWidth: 1,
    borderBlockColor: theme.colors.buttonColorDisable,
    marginRight: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: theme.colors.buttonColorDisable,
  },
  schoolLogo: {height: 44, width: 44, marginRight: 10},
  schoolTxt: {
    color: theme.colors.textColorHq,
    fontSize: 15,
    fontWeight: '500',
  },
}));
