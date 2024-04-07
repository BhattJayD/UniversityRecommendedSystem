import React from 'react';
import {Image, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Iconpack from '../utils/Iconpack';
import Button from '../components/Button';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import AuthStore from '../stores/AuthStore';

const Home = ({navigation}: any) => {
  const offsetTitleView = useSharedValue(0);

  const animatedStylesTitle = useAnimatedStyle(() => ({
    // transform: [{translateX: offsetTitleView.value}],
    opacity: offsetTitleView.value,
  }));

  const offsetFstKey = useSharedValue(-4000);

  const animatedStylesFst = useAnimatedStyle(() => ({
    transform: [{translateX: offsetFstKey.value}],
  }));

  const offsetSndKey = useSharedValue(4000);

  const animatedStylesSnd = useAnimatedStyle(() => ({
    transform: [{translateX: offsetSndKey.value}],
  }));

  const offsetTrdKey = useSharedValue(-4000);

  const animatedStylesTrd = useAnimatedStyle(() => ({
    transform: [{translateX: offsetTrdKey.value}],
  }));

  const offsetTBtn = useSharedValue(0);

  const animatedStylesBtn = useAnimatedStyle(() => ({
    opacity: offsetTBtn.value,
  }));

  React.useEffect(() => {
    offsetTitleView.value = withTiming(1, {duration: 500});

    offsetFstKey.value = withTiming(0, {duration: 2000, easing: Easing.ease});
    offsetSndKey.value = withTiming(0, {duration: 2500, easing: Easing.ease});
    offsetTrdKey.value = withTiming(0, {duration: 3000, easing: Easing.ease});
    offsetTBtn.value = withTiming(1, {duration: 8000, easing: Easing.bounce});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <View style={styles.logoView}>
        <Image style={styles.logoImg} source={Iconpack.ICON} />
        <Image style={styles.logoImg} source={Iconpack.ICON} />
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.titleView, animatedStylesTitle]}>
          <Text style={styles.welcomeText}>Welcome to university finder</Text>
          <Text style={styles.desText}>
            one app for all your stydy abroad needs
          </Text>
        </Animated.View>

        <Animated.View style={[styles.infoView, animatedStylesFst]}>
          <Text style={styles.welcomeText}>
            Discover Universities & Courses
          </Text>
          <Text style={styles.desText}>
            Across the UK, Australia, New Zealand, Canada, Us, Europe & South
            Korea
          </Text>
        </Animated.View>

        <Animated.View style={[styles.infoView, animatedStylesSnd]}>
          <Text style={styles.welcomeText}>Track Your Progress</Text>
          <Text style={styles.desText}>
            And stay on top of your applications & offer sratus at all times
          </Text>
        </Animated.View>

        <Animated.View style={[styles.infoView, animatedStylesTrd]}>
          <Text style={styles.welcomeText}>
            Discover Universities & Sourses
          </Text>
          <Text style={styles.desText}>
            Across the UK, Australia, New Zealand, Canada, Us, Europe & South
            Korea
          </Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.bottomBtn, animatedStylesBtn]}>
        <Button
          title="Logout"
          onPress={() => {
            AuthStore.logout();
            navigation.replace('AppInfo');
          }}
        />
        <Text style={styles.withUsTxt}>
          100 aspirants already exploring there options with us
        </Text>
      </Animated.View>
    </View>
  );
};

export default Home;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
  container: {
    alignItems: 'center',
  },
  logoView: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleView: {
    marginBottom: 40,
  },
  welcomeText: {
    color: theme.colors.textColorHq,
    fontSize: 20,
  },
  desText: {
    color: theme.colors.textColorLq,
    fontSize: 14,
  },
  infoView: {
    width: '90%',
    paddingVertical: 24,
  },
  logoImg: {
    height: 60,
    width: 60,
  },
  withUsTxt: {
    color: theme.colors.buttonColor,
    fontSize: 10,
  },
  bottomBtn: {
    // width: '90%',
    position: 'absolute',
    bottom: 30,
    right: 20,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
