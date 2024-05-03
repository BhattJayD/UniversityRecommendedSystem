// import {} from 'react-native';
import React, {useEffect} from 'react';
import AuthStore from '../../stores/AuthStore';
import {useIsFocused} from '@react-navigation/native';
import {showToast} from '../../utils/Helper';

export default function EmptyScreen({navigation}: any) {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      AuthStore.logout();
      AuthStore.selectedCountry = [];
      AuthStore.selectedDegree = '';
      AuthStore.DegreePercentage = {};
      AuthStore.selectedField = '';
      AuthStore.extraExamDetails = {};
      navigation.navigate('Login');
      showToast('Please Relogin');
    }
  }, [isFocused]);

  return <></>;
}
