import React from 'react';
import {Button, View} from 'react-native';
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from 'react-native-unistyles';

const Register = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Settings"
        onPress={() => {
          UnistylesRuntime.setTheme(
            UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark',
          );
        }}
      />
    </View>
  );
};

export default Register;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
}));
