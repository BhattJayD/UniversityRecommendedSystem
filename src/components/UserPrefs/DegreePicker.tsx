import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

const DegreePicker = observer(() => {
  const {styles} = useStyles(stylesheet);

  const [selectedDegree, setSelectedDegree] = useState<string>('');

  const COUNTRY_Data = [
    {id: 1, name: 'Bachelors', url: Iconpack.ICON, key: 'BACHELORS'},
    {id: 2, name: 'Masters', url: Iconpack.ICON, key: 'MASTERS'},
    // {id: 3, name: 'MBA', url: Iconpack.ICON, key: 'MBA'},
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

  const onBack = () => {
    runInAction(() => {
      AuthStore.selectedCountry = [];
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, []);

  return (
    <View style={styles.flex}>
      <View style={styles.abs}>
        {[1, 2, 3, 4].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      <Animated.View style={[styles.rowStyle, countryTxtStyle]}>
        <TouchableOpacity onPress={onBack}>
          <Image source={Iconpack.BACK} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headingTxt}>
          Which degree do you wish to pursue?
        </Text>
      </Animated.View>
      <FlatList
        data={COUNTRY_Data}
        renderItem={({item}) => {
          return (
            <RenderCountryItem
              item={item}
              isSelected={selectedDegree.includes(item.key)}
              onPress={() => {
                setSelectedDegree(item.key);
              }}
            />
          );
        }}
      />
      <Button
        title="Submit"
        onPress={() => {
          runInAction(() => {
            AuthStore.selectedDegree = selectedDegree;
          });
          console.log(AuthStore.selectedDegree);
        }}
      />
    </View>
  );
});

export default DegreePicker;

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
    fontSize: 18,
    color: theme.colors.textColorHq,
    fontWeight: '600',
    marginLeft: 5,
  },
  backIcon: {height: 20, width: 20},
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
