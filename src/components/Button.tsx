import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type ButtonType = {
  title: string;
  onPress: () => void;
};

const Button = ({title, onPress}: ButtonType) => {
  const {styles} = useStyles(stylesheet);

  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        try {
          onPress();
        } catch (error) {
          console.log(error);
        }
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
