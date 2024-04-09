import React from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const Home = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.flex}>
      <></>
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
}));
