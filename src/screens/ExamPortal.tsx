import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Iconpack from '../utils/Iconpack';
import AuthStore from '../stores/AuthStore';
import {Observer, observer} from 'mobx-react';
import ProgressCircle from 'react-native-progress-circle';
import {runInAction} from 'mobx';
import {isEmpty} from '../utils/Helper';
import {useIsFocused} from '@react-navigation/native';
const ExamPortal = observer(({navigation}: any) => {
  const {styles} = useStyles(stylesheet);
  const data = [
    {
      id: 1,
      url: 'https://www.ets.org/pdfs/toefl/toefl-ibt-student-test-prep-planner.pdf',
      title: 'Toefl Ibt Student Test Prep Planner',
    },
    {
      id: 2,
      url: 'https://images.static-collegedunia.com/public/college_data/images/entrance/entrance_brochure/1603189704Cracking%20the%20TOEFL%202019%20Edition.pdf',
      title: 'entrance brochure',
    },
    {
      id: 3,
      url: 'https://www.ets.org/pdfs/toefl/toefl-ibt-free-practice-test.pdf',
      title: 'toefl ibt free practice test',
    },
    {
      id: 4,
      url: 'https://ia800605.us.archive.org/23/items/250524255BarronSTOEFL13thEdition/250524255-Barron-s-TOEFL-13th-Edition.pdf',
      title: 'toefl 13th edition Barron',
    },
    {
      id: 5,
      url: 'https://goacademy.de/fileadmin/content/mediathek/ETS_TOEIC_TOEFL/TOEFL-test-prep-planner.pdf',
      title: 'ETS test prep planner',
    },
    {
      id: 6,
      url: 'https://www.ets.org/pdfs/toefl/toefl-ibt-free-practice-test.pdf',
      title: 'toefl ibt free practice test',
    },
  ];

  //   const [per, setPer] = useState<number>(0);
  const per = useRef(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      updateProgress();
    }
  }, [isFocused]);

  const updateProgress = async () => {
    let a = await AuthStore.getUsersEduData();
    if (!isEmpty(a?.ids)) {
      runInAction(() => {
        AuthStore.eduData = a?.ids;
      });
    }
    const completedCount = data.filter(item =>
      AuthStore.eduData.includes(item.id.toString()),
    ).length;
    const progressPercentage = (completedCount / data.length) * 100;
    per.current = progressPercentage;
  };

  const handleItemClick = (itemId: string, item: any) => {
    AuthStore.saveUsersEduData(AuthStore.user.user.uid, itemId);
    updateProgress();
    navigation.navigate('PDFViewer', {item});
  };

  return (
    <View style={styles.flex}>
      <View style={styles.alignCenter}>
        <ProgressCircle
          percent={(AuthStore.eduData.length / 6) * 100}
          radius={50}
          borderWidth={8}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff">
          <Text style={styles.headingTxt}>{`${(
            (AuthStore.eduData.length / 6) *
            100
          ).toFixed(2)}%`}</Text>
        </ProgressCircle>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <Observer>
              {() => (
                <TouchableOpacity
                  onPress={() => handleItemClick(item.id.toString(), item)}>
                  <View style={styles.row}>
                    <Image source={Iconpack.ICON} style={styles.icon} />
                    <View style={styles.rowBW}>
                      <Text style={styles.headingTxt}>{item.title}</Text>
                      {AuthStore.eduData.includes(item.id.toString()) && (
                        <Image source={Iconpack.DONE} style={styles.icon} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </Observer>
          );
        }}
      />
    </View>
  );
});

export default ExamPortal;

const stylesheet = createStyleSheet(theme => ({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.margins.xl,
  },
  headingTxt: {
    color: theme.colors.textColorHq,
    fontWeight: '500',
    fontSize: 16,
  },
  icon: {height: 30, width: 30, marginRight: 15},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  rowBW: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
  },
  alignCenter: {alignItems: 'center'},
}));
