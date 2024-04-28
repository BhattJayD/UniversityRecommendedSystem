import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import Router from './Router';
import './styles/unistyles';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import AuthStore from './stores/AuthStore';
import axios from 'axios';

const App = () => {
  const {styles} = useStyles(stylesheet);
  useEffect(() => {
    AuthStore.getTotalUsers();
    // setTimeout(async () => {
    //   const response = await axios.post(
    //     'https://api.leverageedu.com/services/ip/university/course/finder/universities/v3',
    //     {
    //       offSet: 0,
    //       limit: 0,
    //       search_program_tag: false,
    //       university_type: '',
    //       page_uni: 1,
    //       country_ids: ['230'],
    //       heighest_education_level_percentage: '55',
    //       heighest_education_level_id: '27',
    //       degree_type: 'BACHELORS',
    //       field_of_study_id: ['Computers and Data Science'],
    //     },
    //     {
    //       headers: {
    //         'User-Agent':
    //           'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0',
    //         'Accept-Language': 'en-US,en;q=0.5',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         Origin: 'https://leverageedu.com',
    //         Connection: 'keep-alive',
    //         Referer: 'https://leverageedu.com/',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Site': 'same-site',
    //         TE: 'trailers',
    //       },
    //     },
    //   );
    //   console.log(JSON.stringify(response.data, null, 2));
    // }, 1000);

    AuthStore.getFailSafeData();
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
