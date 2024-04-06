import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type ButtonType = {
  title: string;
};

const Button = ({title}: ButtonType) => {
  const {styles} = useStyles(stylesheet);

  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        // alert(1);
      }}>
      <Text style={styles.titleTxt}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
const stylesheet = createStyleSheet(theme => ({
  mainView: {
    backgroundColor: theme.colors.buttonColor,
    height: 48,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 16,
    color: theme.colors.lightWhite,
  },
}));
