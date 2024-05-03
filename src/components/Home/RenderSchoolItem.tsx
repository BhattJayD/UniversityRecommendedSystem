import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
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
import Modal from '../Modal';

const RenderSchoolItem = ({item}: any) => {
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
    array: number[] = [
      1, 2, 5, 6, 7, 8, 10, 12, 14, 16, 18, 19, 20, 21, 3, 4, 11, 9,
    ],
  ) {
    // Array of numbers to choose from
    const numbers = array;

    // Get a random index from 0 to length of the array
    const randomIndex = Math.floor(Math.random() * numbers.length);

    // Return the number at the random index
    return numbers[randomIndex];
  }
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  type typeDataKM = {
    airport: number;
    hospital: number;
    mall: number;
    transport: number;
    hostel: number;
  };
  const [dataKM] = useState<typeDataKM>({
    airport: pickNumber(),
    hospital: pickNumber(),
    mall: pickNumber(),
    transport: pickNumber(),
    hostel: pickNumber(),
  });

  return (
    <Animated.View style={[styles.itemView, itemAnimatedStyle]}>
      <Modal
        airport={dataKM.airport}
        hospital={dataKM.hospital}
        item={data}
        isVisibles={showModal}
        mall={dataKM.mall}
        setShowModal={() => setShowModal(false)}
        transport={dataKM.transport}
        hostel={dataKM.hostel}
      />
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
      <View style={[styles.rowCenterBW, {marginBottom: 10}]}>
        <Text style={styles.schoolTxt}>University fees</Text>
        <Text style={styles.schoolTxt}>
          {!isEmpty(item.application_fee)
            ? `${item.application_fee} ${item.application_fee_currency}`
            : `34K ${item.application_fee_currency}`}
        </Text>
      </View>
      <Button
        title="View more"
        onPress={() => {
          setData(item);
          setShowModal(true);
        }}
      />
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
