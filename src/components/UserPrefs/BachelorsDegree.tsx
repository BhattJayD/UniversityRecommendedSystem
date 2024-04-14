import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
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

  return (
    <View style={styles.flex}>
      <View style={styles.abs}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => {
          return <MoveCircle key={e + i.toString()} />;
        })}
      </View>
      <Animated.View style={countryTxtStyle}>
        <Text style={styles.headingTxt}>
          What is your highest education level?
        </Text>
      </Animated.View>
      <View>
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
                    value={percentage}
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
                value={percentage}
                maxLength={3}
                onChangeText={e => setPercentage(e)}
                keyboardType="number-pad"
              />
            </>
          )}
        </>
      )}
      <Button
        title="Submit"
        disable={
          (selectedDegree === '12' && selectedPicker === 'Select') ||
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
}));
