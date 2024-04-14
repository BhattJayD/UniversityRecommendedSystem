import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runInAction} from 'mobx';
import AuthStore from '../../stores/AuthStore';
import Button from '../Button';
import Iconpack from '../../utils/Iconpack';
import RenderCountryItem from '../RenderCountryItem';
import MoveCircle from '../MoveCircle';
import {observer} from 'mobx-react';

const CountryPicker = observer(() => {
  const {styles} = useStyles(stylesheet);

  const [selectedCountry, setSelectedCountry] = useState<number[]>([]);

  const COUNTRY_Data = [
    {id: 1, name: 'Australia', url: Iconpack.AUSTRALIA, key: 13},
    {id: 2, name: 'Canada', url: Iconpack.CANADA, key: 38},
    // {
    //   id: 3,
    //   name: 'Europe',
    //   url: Iconpack.EU,
    //   key: '75,82,105,155,205,212,228,181,58,164,175,211,21,120,107,198,68,99,74,126,176,135,14',
    // },
    {id: 3, name: 'New Zealand', url: Iconpack.NEWZEALAND, key: 157},
    {id: 4, name: 'United Kingdom', url: Iconpack.UK, key: 230},
    {id: 5, name: 'United States', url: Iconpack.USA, key: 231},
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => {
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
        renderItem={({item}) => {
          return (
            <RenderCountryItem
              item={item}
              isSelected={selectedCountry.includes(item.key)}
              onPress={() => {
                if (selectedCountry.includes(item.key)) {
                  setSelectedCountry(i => i.filter(e => e !== item.key));
                } else {
                  setSelectedCountry(e => [...e, item.key]);
                }
              }}
            />
          );
        }}
      />
      <Button
        title="Submit"
        onPress={() => {
          runInAction(() => {
            AuthStore.selectedCountry = selectedCountry;
          });
          console.log(AuthStore.selectedCountry);
        }}
      />
    </View>
  );
});

export default CountryPicker;

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
}));
