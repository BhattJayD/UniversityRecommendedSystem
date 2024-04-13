import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import MoveCircle from '../components/MoveCircle';
import Iconpack from '../utils/Iconpack';
import RenderCountryItem from '../components/RenderCountryItem';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const UserPref = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  const [selectedCountry, setSelectedCountry] = useState<number[]>([]);

  const COUNTRY_Data = [
    {id: 1, name: 'Australia', url: Iconpack.AUSTRALIA},
    {id: 2, name: 'Canada', url: Iconpack.CANADA},
    {id: 3, name: 'Europe', url: Iconpack.EU},
    {id: 4, name: 'New Zealand', url: Iconpack.NEWZEALAND},
    {id: 5, name: 'United Kingdom', url: Iconpack.UK},
    {id: 6, name: 'United States', url: Iconpack.USA},
  ];

  const translateX = useSharedValue(-1000);

  const countryTxtStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 1500});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.flex}>
      <View style={styles.abs}>
        {[1, 2, 3, 4, 5, 6].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      <Animated.View style={countryTxtStyle}>
        <Text style={styles.headingTxt}>
          Which country do you wish to pursue your education in?
        </Text>
      </Animated.View>
      <FlatList
        data={COUNTRY_Data}
        // onViewableItemsChanged={({viewableItems: vItems}) => {
        //   viewableItems.value = vItems;
        // }}
        renderItem={({item, index}) => {
          return (
            <RenderCountryItem
              item={item}
              isSelected={selectedCountry.includes(index)}
              onPress={() => {
                if (selectedCountry.includes(index)) {
                  setSelectedCountry(i => i.filter(e => e !== index));
                } else {
                  setSelectedCountry(e => [...e, index]);
                }
              }}
            />
          );
        }}
      />
      <Button
        title="Submit"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default UserPref;

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
