import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type ButtonType = {
  title: string;
  onPress: () => void;
  disable?: boolean;
};

const Button = ({title, onPress, disable = false}: ButtonType) => {
  const {styles} = useStyles(stylesheet);

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        styles.mainView,
        disable ? styles.disableView : styles.enableView,
      ]}
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
  disableView: {
    backgroundColor: theme.colors.buttonColorDisable,
  },
  enableView: {
    backgroundColor: theme.colors.buttonColor,
  },
  titleTxt: {
    fontSize: 16,
    color: theme.colors.lightWhite,
  },
}));
