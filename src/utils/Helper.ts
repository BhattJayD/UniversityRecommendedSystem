import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const showToast = (mes: string = 'A wild toast appeared!') => {
  ToastAndroid.showWithGravityAndOffset(
    mes,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const isEmpty = (input: any) => {
  if (input === null || input === undefined) {
    return true; // Null or undefined
    //   deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
  } else if (typeof input === 'string' && input.trim() === '') {
    return true; // Empty string
    //   deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
  } else if (Array.isArray(input) && input.length === 0) {
    return true; // Empty array
    //   deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
  } else if (typeof input === 'object' && Object.keys(input).length === 0) {
    return true; // Empty object
  } else {
    return false; // Not empty
  }
};

export const storeToAsyncStorage = async (item: string, value: string) => {
  try {
    await AsyncStorage.setItem(item, value);
    console.log(item, value);
  } catch (error) {
    // Error saving data
    console.log('error --->storeToAsyncStorage', error);
  }
};

export const getFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(key, value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log('error --->getFromAsyncStorage', error);
  }
};
