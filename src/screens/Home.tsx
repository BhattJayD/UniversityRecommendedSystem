import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import AuthStore from '../stores/AuthStore';
import axios from 'axios';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react';

const Home = observer(({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  useEffect(() => {
    (async () => {
      let userData = await AuthStore.checkUserExistOrNot(
        AuthStore.user.user.uid,
      );
      // @ts-ignore
      AuthStore.storedPref = userData.userPref;
      console.log(AuthStore.storedPref, 'AuthStore.storedPref');

      const response = await axios.post(
        'https://api.leverageedu.com/services/ip/university/course/finder/universities/v3',
        AuthStore.storedPref,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Origin: 'https://leverageedu.com',
            Connection: 'keep-alive',
            Referer: 'https://leverageedu.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            TE: 'trailers',
          },
        },
      );
      console.log(response.data.data);
      runInAction(() => {
        AuthStore.colegeData = response.data.data;
      });
      // setData(userData);
    })();
  }, []);

  return (
    <View style={styles.flex}>
      <Text style={styles.headingTxt}>dream colleges</Text>
      <FlatList
        data={AuthStore?.colegeData?.dreamData}
        renderItem={({item}) => {
          return (
            <View style={{borderWidth: 1, borderBlockColor: '#841FFD33'}}>
              <Text style={styles.headingTxt}>
                School Name :- {item.school_name}
              </Text>
            </View>
          );
        }}
      />

      <Text style={styles.headingTxt}>reachData colleges</Text>
      <FlatList
        data={AuthStore?.colegeData?.reachData}
        renderItem={({item}) => {
          return (
            <View style={{borderWidth: 1, borderBlockColor: '#841FFD33'}}>
              <Text style={styles.headingTxt}>
                School Name :- {item.school_name}
              </Text>
            </View>
          );
        }}
      />

      <Text style={styles.headingTxt}>safeData colleges</Text>
      <FlatList
        data={AuthStore?.colegeData?.safeData}
        renderItem={({item}) => {
          return (
            <View style={{borderWidth: 1, borderBlockColor: '#841FFD33'}}>
              <Text style={styles.headingTxt}>
                School Name :- {item.school_name}
              </Text>
            </View>
          );
        }}
      />

      <Button
        title="Logout"
        onPress={() => {
          AuthStore.logout();
          navigation.replace('AppInfo');
        }}
      />
    </View>
  );
});

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
