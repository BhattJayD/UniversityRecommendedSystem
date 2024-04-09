import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import Router from './Router';
import './styles/unistyles';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import AuthStore from './stores/AuthStore';

const App = () => {
  const {styles} = useStyles(stylesheet);
  useEffect(() => {
    AuthStore.getTotalUsers();
  }, []);

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
