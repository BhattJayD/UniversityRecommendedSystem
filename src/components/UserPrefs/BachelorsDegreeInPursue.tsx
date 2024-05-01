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

const BachelorsDegreeInPursue = observer(() => {
  const {styles} = useStyles(stylesheet);

  const [selectedDegree, setSelectedDegree] = useState<number>(-1);
  const DATA = [
    {id: 1, name: 'Management', url: Iconpack.ICON, key: 'Management'},
    {id: 2, name: 'Engineering', url: Iconpack.ICON, key: 'Engineering'},
    {
      id: 3,
      name: 'Computers and Data Science',
      url: Iconpack.ICON,
      key: 'Computers and Data Science',
    },
    {
      id: 4,
      name: 'Design',
      url: Iconpack.ICON,
      key: 'Design',
    },
    {
      id: 5,
      name: 'Finance and Banking',
      url: Iconpack.ICON,
      key: 'Finance and Banking',
    },
    {
      id: 6,
      name: 'Law',
      url: Iconpack.ICON,
      key: 'Law',
    },
    {
      id: 7,
      name: 'Humanities and Social Sciences',
      url: Iconpack.ICON,
      key: 'Humanities and Social Sciences',
    },
    {
      id: 8,
      name: 'Sciences',
      url: Iconpack.ICON,
      key: 'Sciences',
    },
    {
      id: 9,
      name: 'Medicine and Pharma',
      url: Iconpack.ICON,
      key: 'Medicine and Pharma',
    },
    {
      id: 10,
      name: 'Performing and Creative Arts',
      url: Iconpack.ICON,
      key: 'Performing and Creative Arts',
    },
    {
      id: 11,
      name: 'Media and Journalism',
      url: Iconpack.ICON,
      key: 'Media and Journalism',
    },
    {
      id: 12,
      name: 'Hospitality and Tourism',
      url: Iconpack.ICON,
      key: 'Hospitality and Tourism',
    },
    {
      id: 13,
      name: 'Marketing and Advertising',
      url: Iconpack.ICON,
      key: 'Marketing and Advertising',
    },
    {
      id: 14,
      name: 'Sports and Nutrition',
      url: Iconpack.ICON,
      key: 'Sports and Nutrition"',
    },
    {
      id: 15,
      name: 'Architecture',
      url: Iconpack.ICON,
      key: 'Architecture',
    },
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
      AuthStore.DegreePercentage = {};
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
      <Animated.View style={[countryTxtStyle, styles.rowStyle]}>
        <TouchableOpacity onPress={() => onBack()}>
          <Image source={Iconpack.BACK} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headingTxt}>
          Which major do you want to pursue?
        </Text>
      </Animated.View>

      <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <RenderCountryItem
              item={item}
              isSelected={selectedDegree === index}
              onPress={() => {
                setSelectedDegree(index);
              }}
            />
          );
        }}
      />

      <Button
        title="Submit"
        disable={selectedDegree === -1}
        onPress={() => {
          runInAction(() => {
            AuthStore.selectedField = DATA[selectedDegree].key;
          });
          console.log(AuthStore.selectedField);
        }}
      />
    </View>
  );
});

export default BachelorsDegreeInPursue;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
  abs: {
    position: 'absolute',
  },
  percentageTxt: {
    fontSize: 24,
    color: theme.colors.buttonColor,
    fontWeight: '600',
  },
  whatPerTxt: {
    fontSize: 16,
    color: theme.colors.textColorHq,
    fontWeight: '500',
  },
  ipStyle: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: theme.colors.buttonColor,
    color: theme.colors.textColorHq,
  },
  backIcon: {height: 20, width: 20},
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingTxt: {
    fontSize: 16,
    color: theme.colors.textColorHq,
    fontWeight: '600',
    marginLeft: 10,
  },
}));
