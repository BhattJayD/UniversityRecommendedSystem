import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Text,
  TextInput,
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
import {isEmpty} from '../../utils/Helper';

const BachelorsDegreeExtraExams = observer(({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  const [selectedExam, setSelectedExam] = useState<string>('');
  const [score, setScore] = useState<string>('');

  const DATA = [
    {id: 1, name: 'TOEFL', url: Iconpack.ICON, key: 'TOEFL'},
    {id: 2, name: 'IELTS', url: Iconpack.ICON, key: 'IELTS'},
    {id: 3, name: 'PTE', url: Iconpack.ICON, key: 'PTE'},
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
      AuthStore.selectedField = '';
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      <Animated.View style={[countryTxtStyle, styles.rowStyle]}>
        <TouchableOpacity onPress={() => onBack()}>
          <Image source={Iconpack.BACK} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headingTxt}>
          Which english language test have you taken?
        </Text>
      </Animated.View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({item}) => {
            return (
              <RenderCountryItem
                item={item}
                isSelected={selectedExam === item.key}
                onPress={() => {
                  setSelectedExam(item.key);
                }}
              />
            );
          }}
        />
      </View>

      <>
        <Text style={styles.whatPerTxt}>Score</Text>
        <TextInput
          placeholder="Score"
          value={score}
          style={styles.ipStyle}
          maxLength={3}
          onChangeText={e => setScore(e)}
          keyboardType="number-pad"
        />
      </>

      <Button
        title="Submit"
        disable={isEmpty(score) || isEmpty(selectedExam)}
        onPress={async () => {
          await AuthStore.saveUserPrefToFireStore(AuthStore.user.user.uid, {
            offSet: 0,
            limit: 0,
            search_program_tag: false,
            university_type: '',
            page_uni: 1,
            country_ids: AuthStore.selectedCountry,
            heighest_education_level_percentage: score,
            heighest_education_level_id: '27',
            degree_type: AuthStore.selectedDegree,
            field_of_study_id: [AuthStore.selectedField],
          });
          runInAction(() => {
            AuthStore.extraExamDetails = {
              score,
              selectedExam,
            };
          });

          console.log(AuthStore.extraExamDetails);
          navigation.replace('Home');
        }}
      />
    </View>
  );
});

export default BachelorsDegreeExtraExams;

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
  },
  backIcon: {height: 24, width: 24},
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
