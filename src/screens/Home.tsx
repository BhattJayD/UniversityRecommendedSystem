import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import AuthStore from '../stores/AuthStore';

const Home = ({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  type userType = {
    age: string;
    countryCode: string;
    eduLevel: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number: string;
  };
  const [data, setData] = useState<userType>({
    age: '',
    countryCode: '',
    eduLevel: '',
    email: '',
    gender: '',
    id: '',
    name: '',
    number: '',
  });
  useEffect(() => {
    (async () => {
      let userData = await AuthStore.checkUserExistOrNot(
        AuthStore.user.user.uid,
      );
      console.log(data, 'dasdasdas');
      setData(userData);
    })();
  }, []);

  return (
    <View style={styles.flex}>
      <View>
        <Text style={styles.headingTxt}>name {data.name}</Text>
        <Text style={styles.headingTxt}>DOB {data.age}</Text>
        <Text style={styles.headingTxt}>Country {data.countryCode}</Text>
        <Text style={styles.headingTxt}>
          Highest education level {data.eduLevel}
        </Text>
        <Text style={styles.headingTxt}>Email {data.email}</Text>
        <Text style={styles.headingTxt}>Gender {data.gender}</Text>
        <Text style={styles.headingTxt}>Number {data.number}</Text>
      </View>
      <Button
        title="Logout"
        onPress={() => {
          AuthStore.logout();
          navigation.replace('AppInfo');
        }}
      />
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
  headingTxt: {
    color: theme.colors.textColorHq,
  },
}));
