import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View, ViewToken} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from '../components/Button';
import AuthStore from '../stores/AuthStore';
import axios from 'axios';
import {runInAction, toJS} from 'mobx';
import {observer} from 'mobx-react';
import RenderSchoolItem from '../components/Home/RenderSchoolItem';
import {useSharedValue} from 'react-native-reanimated';
import {isEmpty} from '../utils/Helper';

const Home = observer(({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  // const [data, setData] = useState([]);
  const data = useRef(null);
  useEffect(() => {
    (async () => {
      let userData = await AuthStore.checkUserExistOrNot(
        AuthStore.user.user.uid,
      );
      // @ts-ignore
      AuthStore.storedPref = userData.userPref;
      console.log(AuthStore.storedPref, 'AuthStore.storedPref');

      await axios
        .post(
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
        )
        .then(response => {
          runInAction(() => {
            AuthStore.colegeData = response.data.data;
            if (isEmpty(AuthStore?.colegeData?.safeData)) {
              AuthStore.colegeData = AuthStore.failSafeData;
            }
          });
          data.current = response.data.data;
        })
        .catch(e => {
          console.log(e, 'responseresponse');
          runInAction(() => {
            AuthStore.colegeData = AuthStore.failSafeData;
          });
        });

      // console.log(data.current, 'fata');

      const responseTrending = await axios.get(
        'https://api.leverageedu.com/services/accommodation/v4/property/trending',
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
      console.log(
        JSON.stringify(responseTrending.data.Data, null, 2),
        'responseTrending.data',
      );
      runInAction(() => {
        AuthStore.trendingCollegeData = responseTrending.data.Data;
      });
    })();
  }, []);

  const viewableItemsReach = useSharedValue<ViewToken[]>([]);
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 5);
  }

  return (
    <ScrollView>
      <View style={styles.flex}>
        {/* <Text style={styles.headingTxt}>dream colleges</Text>
      <FlatList
        data={AuthStore?.colegeData?.dreamData}
        renderItem={({item}) => {
          console.log(JSON.stringify(item, null, 2));

          return (
            <View style={{borderWidth: 1, borderBlockColor: '#841FFD33'}}>
              <Text style={styles.headingTxt}>
                School Name :- {item.school_name}
              </Text>
            </View>
          );
        }}
      /> */}
        <Text style={styles.headingTxt}>Top colleges</Text>
        <View>
          {!isEmpty(AuthStore?.colegeData) && (
            <FlatList
              data={
                !isEmpty(AuthStore?.trendingCollegeData)
                  ? AuthStore?.trendingCollegeData
                  : shuffleArray([
                      ...AuthStore?.colegeData?.reachData,
                      ...AuthStore?.colegeData?.safeData,
                      ...AuthStore?.colegeData?.dreamData,
                    ])
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                console.log(item, 'oiii');

                return <RenderSchoolItem item={item} />;
              }}
            />
          )}
        </View>

        <Text style={styles.headingTxt}>
          {isEmpty(AuthStore?.colegeData?.reachData) ? '' : 'Reach colleges'}
        </Text>
        <View>
          <FlatList
            data={AuthStore?.colegeData?.reachData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <RenderSchoolItem item={item} />;
            }}
          />
        </View>

        <Text style={styles.headingTxt}>
          {isEmpty(AuthStore?.colegeData?.safeData) ? '' : 'Safe colleges'}
        </Text>
        <View>
          <FlatList
            data={AuthStore?.colegeData?.safeData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <RenderSchoolItem item={item} />;
            }}
          />
        </View>
        <Text style={styles.headingTxt}>
          {isEmpty(AuthStore?.colegeData?.dreamData) ? '' : 'Dream colleges'}
        </Text>
        <View>
          <FlatList
            data={AuthStore?.colegeData?.dreamData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <RenderSchoolItem item={item} />;
            }}
          />
        </View>

        <Button
          title="Update your college prefrence"
          onPress={() => {
            // AuthStore.logout();
            // navigation.replace('AppInfo');
            AuthStore.removeUserPref(AuthStore.user.user.uid);
            AuthStore.resetPref();
            navigation.replace('UserPref');
          }}
        />

        <View style={{marginTop: 30}}>
          <Button
            title="Logout"
            onPress={() => {
              AuthStore.logout();
              navigation.replace('AppInfo');
            }}
          />
        </View>
      </View>
    </ScrollView>
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
  itemView: {
    borderWidth: 1,
    borderBlockColor: theme.colors.buttonColorDisable,
    marginRight: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: theme.colors.buttonColorDisable,
  },
  schoolLogo: {height: 44, width: 44, marginRight: 10},
  schoolTxt: {
    color: theme.colors.textColorHq,
    fontSize: 15,
    fontWeight: '500',
  },
}));
