import React, {useState} from 'react';
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

const Login = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);

  // states

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
            value={username}
            onChangeText={e => {
              setUsername(e);
            }}
            placeholder="Email"
            placeholderTextColor={'#000'}
            style={styles.ipStyle}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.ipView, PasswdViewValStyle]}>
        <Text style={styles.headingTxt}>Password</Text>
        <View style={styles.txtIpView}>
          <TextInput
            style={styles.ipStyle}
            value={password}
            onChangeText={e => {
              setPassword(e);
            }}
            placeholderTextColor={'#000'}
            placeholder="Password"
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.bottomBtn, loginBtnStyle]}>
        <Button
          title="Login"
          onPress={() => {
            AuthStore.onSignIn(username, password)
              .then(r => {
                if (r === 'success') {
                  setUsername('');
                  setPassword('');
                  navigation.replace('Home');
                }
              })
              .catch(e => {
                console.log(e);
              });
          }}
        />
        <Text style={styles.accTxt}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.registerTxt}>
            {' '}
            Sign up
          </Text>
        </Text>
      </Animated.View>
    </View>
  );
};

export default Login;

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
  headingTxt: {
    color: theme.colors.textColorHq,
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
    color: theme.colors.textColorLq,
  },
  txtIpView: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.textColorLq,
  },
  ipStyle: {color: theme.colors.textColorHq},
}));
