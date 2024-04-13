import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import AuthStore from '../stores/AuthStore';
import Animated from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import {isEmpty} from '../utils/Helper';

// import {Calendar, LocaleConfig} from 'react-native-calendars';

import CalendarPicker from 'react-native-calendar-picker';

import {CountryPicker} from 'react-native-country-codes-picker';
import MoveCircle from '../components/MoveCircle';

const UserPref = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const [showCal, setShowCal] = useState<boolean>(false);

  const [selectedGender, setSelectedGender] = useState<string>('Select');

  const [eduLevel, setEduLevel] = useState<string>('Select');

  const [show, setShow] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('');

  const onDateChange = e => {
    console.log(age.toString(), new Date(age));

    const date = new Date(e);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate); // Output: 03-04-2024
    setAge(formattedDate);

    // setAge(e?.split('T')?.[0]);
    setShowCal(!showCal);
  };

  return (
    <View style={styles.flex}>
      <View style={styles.abs}>
        {[1, 2, 3, 4, 5, 6].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      <Text style={styles.headingTxt}>Personal Info</Text>
      <Animated.View style={[styles.ipView]}>
        <Text style={styles.titleTxt}>Full name</Text>
        <View style={styles.txtIpView}>
          <TextInput
            style={styles.ipStyle}
            placeholderTextColor={'#000'}
            value={name}
            onChangeText={e => {
              setName(e);
            }}
            placeholder="Full name"
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.ipView, {display: !showCal ? 'flex' : 'none'}]}>
        <Text style={styles.titleTxt}>Date of birth</Text>
        <View style={styles.txtIpView}>
          <Text onPress={() => setShowCal(!showCal)} style={styles.ipStyle}>
            {age !== '' ? `  ${age.toString()}` : ' Select age'}
          </Text>
        </View>
      </Animated.View>
      {showCal && (
        <CalendarPicker
          startFromMonday={true}
          selectedDayColor="#7300e6"
          onDateChange={onDateChange}
        />
      )}

      <Animated.View style={[styles.ipView]}>
        <Text style={styles.titleTxt}>Country</Text>

        <TouchableOpacity onPress={() => setShow(true)}>
          <View style={styles.txtIpView}>
            <Text style={styles.ipStyle}> {'  ' + countryCode}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <CountryPicker
        lang="en"
        show={show}
        pickerButtonOnPress={item => {
          console.log(item);

          setCountryCode(item.name.en);
          setShow(false);
        }}
      />

      <Animated.View style={[styles.ipView]}>
        <Text style={styles.titleTxt}>Gender</Text>
        <View style={styles.txtIpView}>
          <Picker
            selectedValue={selectedGender}
            selectionColor={'#000'}
            style={styles.ipStyle}
            dropdownIconColor={'#000'}
            mode="dropdown"
            onValueChange={itemValue => setSelectedGender(itemValue)}>
            <Picker.Item label="Select Gender" value="Select" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </Animated.View>
      <Animated.View style={[styles.ipView]}>
        <Text style={styles.titleTxt}>Contact number</Text>
        <View style={styles.txtIpView}>
          <TextInput
            style={styles.ipStyle}
            placeholderTextColor={'#000'}
            value={number}
            onChangeText={e => {
              setNumber(e);
            }}
            placeholder="Contact Number"
            keyboardType="numeric"
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.ipView]}>
        <Text style={styles.titleTxt}>Education level</Text>
        <View style={styles.txtIpView}>
          <Picker
            selectedValue={eduLevel}
            selectionColor={'#000'}
            style={styles.ipStyle}
            dropdownIconColor={'#000'}
            mode="dropdown"
            onValueChange={itemValue => setEduLevel(itemValue)}>
            <Picker.Item label="Highest Education Level" value="Select" />
            <Picker.Item label="Post Graduation" value="PG" />
            <Picker.Item label="Under Graduation" value="UG" />
            <Picker.Item label="PHD" value="PHD" />
            <Picker.Item label="MBA" value="MBA" />
          </Picker>
        </View>
      </Animated.View>
      <Button
        title="Submit"
        disable={
          isEmpty(name) ||
          isEmpty(number) ||
          eduLevel === 'Select' ||
          selectedGender === 'Select'
        }
        onPress={() => {
          console.log(AuthStore.user);

          AuthStore.saveUserInfoToFireStore(
            AuthStore.user.user.uid,
            age,
            selectedGender,
            AuthStore.user.user.email ?? '',
            name,
            countryCode,
            number,
            eduLevel,
          );
          navigation.replace('Home');
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
    fontSize: 16,
    color: theme.colors.textColorHq,
    fontWeight: '900',
  },
  titleTxt: {
    color: theme.colors.textColorHq,
  },
  ipView: {
    marginVertical: 12,
    width: '100%',
  },
  txtIpView: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.textColorLq,
    justifyContent: 'center',
  },
  ipStyle: {color: theme.colors.textColorHq},
}));
