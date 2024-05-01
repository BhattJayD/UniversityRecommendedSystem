import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  BackHandler,
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
import {Picker} from '@react-native-picker/picker';
import {isEmpty} from '../../utils/Helper';

const BachelorsDegree = observer(() => {
  const {styles} = useStyles(stylesheet);

  const [selectedDegree, setSelectedDegree] = useState<string>('');
  const [selectedPicker, setSelectedPicker] = useState<string>('Select');
  const [percentage, setPercentage] = useState<string>('');

  const COUNTRY_Data = [
    {id: 1, name: 'Grade 12', url: Iconpack.ICON, key: '12'},
    {id: 2, name: 'Undergraduate Diploma', url: Iconpack.ICON, key: 'Diploma '},
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
      AuthStore.selectedDegree = '';
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
          {AuthStore.selectedDegree === 'MASTERS'
            ? 'What is your expected or gained percentage?'
            : 'What is your highest education level?'}
        </Text>
      </Animated.View>
      <View
        style={{
          display: AuthStore.selectedDegree === 'MASTERS' ? 'none' : 'flex',
        }}>
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
      </View>
      {selectedDegree !== '' && (
        <>
          <View>
            <Text style={styles.percentageTxt}>
              What is your expected or gained percentage?
            </Text>
          </View>
          {selectedDegree === '12' && (
            <>
              <Picker
                selectedValue={selectedPicker}
                selectionColor={'#000'}
                // style={styles.ipStyle}
                dropdownIconColor={'#000'}
                style={styles.pickerStyle}
                mode="dropdown"
                onValueChange={itemValue => setSelectedPicker(itemValue)}>
                <Picker.Item label="Select Board" value="Select" />
                <Picker.Item label="ICSC" value="ICSC" />
                <Picker.Item label="CBSC" value="CBSC" />
                <Picker.Item label="State" value="State" />
              </Picker>
              {selectedPicker !== 'Select' && (
                <>
                  <Text style={styles.whatPerTxt}>Percentage</Text>
                  <TextInput
                    placeholder="Percentage in %"
                    value={percentage}
                    style={styles.ipStyle}
                    placeholderTextColor={'#000'}
                    maxLength={3}
                    onChangeText={e => setPercentage(e)}
                    keyboardType="number-pad"
                  />
                </>
              )}
            </>
          )}

          {selectedDegree !== '12' && (
            <>
              <Text style={styles.whatPerTxt}>Percentage</Text>
              <TextInput
                placeholder="Percentage in %"
                value={percentage}
                style={styles.ipStyle}
                maxLength={3}
                onChangeText={e => setPercentage(e)}
                keyboardType="number-pad"
                placeholderTextColor={'#000'}
              />
            </>
          )}
        </>
      )}
      {AuthStore.selectedDegree === 'MASTERS' && (
        <>
          <Text style={styles.whatPerTxt}>Percentage</Text>
          <TextInput
            placeholder="Percentage in %"
            value={percentage}
            style={styles.ipStyle}
            maxLength={3}
            onChangeText={e => setPercentage(e)}
            keyboardType="number-pad"
            placeholderTextColor={'#000'}
          />
        </>
      )}
      <Button
        title="Submit"
        disable={
          AuthStore.selectedDegree === 'MASTERS'
            ? isEmpty(percentage) ||
              parseInt(percentage) > 100 ||
              parseInt(percentage) < 9
            : (selectedDegree === '12' && selectedPicker === 'Select') ||
              isEmpty(selectedDegree) ||
              isEmpty(percentage) ||
              parseInt(percentage) > 100 ||
              parseInt(percentage) < 9
        }
        onPress={() => {
          runInAction(() => {
            AuthStore.DegreePercentage = {
              percentage,
              selectedEdu: selectedDegree,
              board: selectedPicker !== 'Select' ? selectedPicker : '',
            };
          });
          console.log(AuthStore.DegreePercentage);
        }}
      />
    </View>
  );
});

export default BachelorsDegree;

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
    fontWeight: '600',
    marginLeft: 10,
  },
  percentageTxt: {
    fontSize: 18,
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
  pickerStyle: {color: theme.colors.textColorHq},
}));
