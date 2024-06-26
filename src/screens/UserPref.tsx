import React from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import MoveCircle from '../components/MoveCircle';
import AuthStore from '../stores/AuthStore';
import CountryPicker from '../components/UserPrefs/CountryPicker';
import {isEmpty} from '../utils/Helper';
import {observer} from 'mobx-react';
import DegreePicker from '../components/UserPrefs/DegreePicker';
import BachelorsDegree from '../components/UserPrefs/BachelorsDegree';
import BachelorsDegreeInPursue from '../components/UserPrefs/BachelorsDegreeInPursue';
import BachelorsDegreeExtraExams from '../components/UserPrefs/BachelorsDegreeExtraExams';
import EmptyScreen from '../components/UserPrefs/EmptyScreen';

const UserPref = observer(({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.flex}>
      <View style={styles.abs}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      {/* <RenderComponent /> */}
      {isEmpty(AuthStore.selectedCountry) ? (
        <CountryPicker />
      ) : AuthStore.selectedDegree === '' ? (
        <DegreePicker />
      ) : (AuthStore.selectedDegree === 'BACHELORS' ||
          AuthStore.selectedDegree === 'MASTERS') &&
        isEmpty(AuthStore.DegreePercentage) ? (
        <BachelorsDegree />
      ) : isEmpty(AuthStore.selectedField) ? (
        <BachelorsDegreeInPursue />
      ) : isEmpty(AuthStore.extraExamDetails) ? (
        <BachelorsDegreeExtraExams navigation={navigation} />
      ) : (
        <></>
      )}
    </View>
  );
});

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
