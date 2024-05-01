import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Iconpack from '../utils/Iconpack';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const Menu = () => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        nav?.dispatch(DrawerActions.openDrawer());
      }}>
      <Image source={Iconpack.MENU} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default Menu;

const styles = StyleSheet.create({
  icon: {height: 20, width: 20, marginLeft: 16},
});
