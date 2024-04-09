import React, {useMemo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import AuthStore from '../stores/AuthStore';
import {isEmpty, validateEmail} from '../utils/Helper';

const Register = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  // states

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cnfPassword, setCnfPassword] = useState<string>('');

  const disable = useMemo(() => {
    if (
      isEmpty(username) ||
      !validateEmail(username) ||
      isEmpty(password) ||
      isEmpty(cnfPassword)
    ) {
      return true;
    } else {
      return false;
    }
  }, [username, password, cnfPassword]);

  const appName = useSharedValue(-1000);

  const appNameStyle = useAnimatedStyle(() => ({
    transform: [{translateY: appName.value}],
  }));

  const loginBtn = useSharedValue(1000);

  const loginBtnStyle = useAnimatedStyle(() => ({
    transform: [{translateY: loginBtn.value}],
  }));

  const EmailViewVal = useSharedValue(1000);

  const EmailViewValStyle = useAnimatedStyle(() => ({
    transform: [{translateX: EmailViewVal.value}],
  }));

  const PasswdViewVal = useSharedValue(-1000);

  const PasswdViewValStyle = useAnimatedStyle(() => ({
    transform: [{translateX: PasswdViewVal.value}],
  }));

  React.useEffect(() => {
    appName.value = withTiming(0, {duration: 1500, easing: Easing.bounce});
    loginBtn.value = withTiming(0, {duration: 1500, easing: Easing.linear});
    EmailViewVal.value = withTiming(0, {duration: 1500});
    PasswdViewVal.value = withTiming(0, {duration: 1500});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.flex}>
      <Animated.View style={appNameStyle}>
        <Text style={styles.titleTxt}>
          <Text style={styles.uniTxt}>University</Text>
          <Text style={styles.finTxt}> Finder</Text>
        </Text>
      </Animated.View>

      <Animated.View style={[styles.ipView, EmailViewValStyle]}>
        <Text style={styles.headingTxt}>Email</Text>
        <View style={styles.txtIpView}>
          <TextInput
            style={styles.ipStyle}
            placeholderTextColor={'#000'}
            value={username}
            onChangeText={e => {
              setUsername(e);
            }}
            placeholder="Email"
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.ipView, PasswdViewValStyle]}>
        <Text style={styles.headingTxt}>Password</Text>
        <View style={styles.txtIpView}>
          <TextInput
            placeholderTextColor={'#000'}
            style={styles.ipStyle}
            value={password}
            onChangeText={e => {
              setPassword(e);
            }}
            placeholder="Password"
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.ipView, PasswdViewValStyle]}>
        <Text style={styles.headingTxt}>Confirm Password</Text>
        <View style={styles.txtIpView}>
          <TextInput
            placeholderTextColor={'#000'}
            style={styles.ipStyle}
            value={cnfPassword}
            onChangeText={e => {
              setCnfPassword(e);
            }}
            placeholder="Confirm Password"
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.bottomBtn, loginBtnStyle]}>
        <Button
          disable={disable}
          title="Sing up"
          onPress={() => {
            AuthStore.onSignUp(username, password)
              .then(r => {
                if (r === 'success') {
                  navigation.replace('UserPref');
                }
              })
              .catch(e => {
                console.log(e);
              });
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Register;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,

    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  uniTxt: {color: theme.colors.buttonColor},
  finTxt: {color: theme.colors.textColorHq},
  bottomBtn: {
    width: '95%',
    alignItems: 'center',
  },
  registerTxt: {
    color: theme.colors.buttonColor,
  },
  ipView: {
    marginVertical: 12,
    width: '100%',
  },
  accTxt: {
    fontSize: 16,
    marginTop: 5,
  },
  txtIpView: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.textColorLq,
  },
  headingTxt: {
    color: theme.colors.textColorHq,
  },
  ipStyle: {color: theme.colors.textColorHq},
}));
