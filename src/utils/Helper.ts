import {ToastAndroid} from 'react-native';

export const showToast = (mes: string = 'A wild toast appeared!') => {
  ToastAndroid.showWithGravityAndOffset(
    mes,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};
