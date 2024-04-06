import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Router from './Router';
import './styles/unistyles';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const App = () => {
  const {styles} = useStyles(stylesheet);
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <Router />
      </View>
    </SafeAreaView>
  );
};
export default App;

const stylesheet = createStyleSheet({
  flex: {
    flex: 1,
  },
});
