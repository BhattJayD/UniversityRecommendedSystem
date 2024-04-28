import React, {useEffect} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {isEmpty} from '../../utils/Helper';
import Iconpack from '../../utils/Iconpack';
import Button from '../Button';

const RenderSchoolItem = ({item, viewableItems}: any) => {
  const {styles} = useStyles(stylesheet);

  // Randomize initial positions and animation properties
  const initialTranslateY = 1000; // Randomly between 0 and 1000
  const initialTranslateX = -1000; // Randomly between -300 and 300
  const duration = 1000 + 1000; // Between 1000 and 2000 milliseconds
  const easing = Easing.inOut(Easing.ease); // You can also randomize easing functions

  const translateY = useSharedValue(initialTranslateY); // Start offscreen
  const translateX = useSharedValue(initialTranslateX); // Start offscreen

  const itemAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateY: translateY.value},
        {translateX: translateX.value},
      ],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(0, {duration, easing}); // Animate to 0 when component mounts
    translateX.value = withTiming(0, {duration, easing}); // Animate to 0 when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickNumber(
    array: number[] = [5, 16, 10, 19, 79, 100, 12, 3, 1, 3, 4, 8, 33, 22],
  ) {
    // Array of numbers to choose from
    const numbers = array;

    // Get a random index from 0 to length of the array
    const randomIndex = Math.floor(Math.random() * numbers.length);

    // Return the number at the random index
    return numbers[randomIndex];
  }

  return (
    <Animated.View style={[styles.itemView, itemAnimatedStyle]}>
      <View style={styles.row}>
        <Image
          source={
            isEmpty(item.school_logo)
              ? Iconpack.ICON
              : {
                  uri:
                    'https://assets.leverageedu.com/school-logo/' +
                    item.school_logo,
                }
          }
          style={styles.schoolLogo}
        />
        <View>
          <Text style={styles.schoolTxt}>
            {item?.school_name ?? item?.name}
          </Text>
          {!isEmpty(item?.establish_year) && (
            <Text style={styles.schoolTxt}>
              Establish in Year {item.establish_year}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>Total Courses</Text>
        <Text style={styles.schoolTxt}>{item?.program_count ?? '-'}</Text>
      </View>

      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>City Name</Text>
        <Text style={styles.schoolTxt}>{item?.city_name ?? '-'}</Text>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>University type</Text>
        <Text style={styles.schoolTxt}>{item?.public_private ?? '-'}</Text>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>University rank</Text>
        <Text style={styles.schoolTxt}>{item?.school_rank ?? '-'}</Text>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>University fees</Text>
        <Text style={styles.schoolTxt}>
          {!isEmpty(item.application_fee)
            ? `${item.application_fee} ${item.application_fee_currency}`
            : `34K ${item.application_fee_currency}`}
        </Text>
      </View>

      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>Nearby airport</Text>
        <Text style={styles.schoolTxt}>{pickNumber()} KM</Text>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>Nearby EMS services</Text>
        <Text style={styles.schoolTxt}>{pickNumber()} KM</Text>
      </View>

      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>Nearby Mall</Text>
        <Text style={styles.schoolTxt}>{pickNumber()} KM</Text>
      </View>
      <View style={styles.rowCenterBW}>
        <Text style={styles.schoolTxt}>Nearby Transport</Text>
        <Text style={styles.schoolTxt}>{pickNumber()} KM</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Talk to an Expert for FREE"
          onPress={() => {
            Linking.openURL('tel:7715912608');
          }}
        />
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
    marginVertical: 20,
    backgroundColor: theme.colors.buttonColorDisable,
  },
  schoolLogo: {height: 44, width: 44, marginRight: 10},
  schoolTxt: {
    color: theme.colors.textColorHq,
    fontSize: 15,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  rowCenterBW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonView: {
    paddingTop: 20,
    borderTopWidth: 0.9,
    borderTopColor: theme.colors.textColorHq,
    borderStyle: 'dashed',
  },
}));
