import React from 'react';
import {Image, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Iconpack from '../utils/Iconpack';
import Button from '../components/Button';

const AppInfo = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <View style={styles.logoView}>
        <Image style={styles.logoImg} source={Iconpack.ICON} />
        <Image style={styles.logoImg} source={Iconpack.ICON} />
      </View>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.welcomeText}>Welcome to university finder</Text>
          <Text style={styles.desText}>
            one app for all your stydy abroad needs
          </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.welcomeText}>
            Discover Universities & Courses
          </Text>
          <Text style={styles.desText}>
            Across the UK, Australia, New Zealand, Canada, Us, Europe & South
            Korea
          </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.welcomeText}>Track Your Progress</Text>
          <Text style={styles.desText}>
            And stay on top of your applications & offer sratus at all times
          </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.welcomeText}>
            Discover Universities & Sourses
          </Text>
          <Text style={styles.desText}>
            Across the UK, Australia, New Zealand, Canada, Us, Europe & South
            Korea
          </Text>
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <Button title="Continue" onPress={() => navigation.navigate('Login')} />
        <Text style={styles.withUsTxt}>
          100 aspirants already exploring there options with us
        </Text>
      </View>
    </View>
  );
};

export default AppInfo;

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
