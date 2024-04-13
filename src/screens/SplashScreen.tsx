import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import AuthStore from '../stores/AuthStore';

export default function SplashScreen({navigation}: any) {
  const {styles} = useStyles(stylesheet);
  useEffect(() => {
    setTimeout(() => {
      AuthStore.checkForAuth()
        .then(r => {
          console.log(r);
          switch (r) {
            case 'Login':
              navigation.replace('Login');
              break;
            case 'Home':
              navigation.replace('Home');
              break;
            case 'Appinfo':
              navigation.replace('AppInfo');
              break;

            case 'PersonalPref':
              navigation.replace('PersonalPref');
              break;

            // deepcode ignore DuplicateCaseBody: handel default
            default:
              navigation.replace('AppInfo');
              break;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }, 1500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.flex}>
      <LottieView
        source={require('../assets/animation.json')}
        loop
        autoPlay
        style={styles.flex}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
}));
