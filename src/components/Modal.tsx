import {
  Text,
  View,
  Modal,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import Button from './Button';
import {isEmpty} from '../utils/Helper';
import Iconpack from '../utils/Iconpack';

type mType = {
  isVisibles: boolean;
  setShowModal: () => void;
  item: any;
  airport: number;
  hospital: number;
  transport: number;
  mall: number;
};
const Modals = ({
  isVisibles,
  setShowModal,
  item,
  airport,
  hospital,
  transport,
  mall,
}: mType) => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.flex}>
      {/*//@ts-ignore*/}
      <Modal
        visible={isVisibles}
        animationType="slide"
        transparent={true}
        onRequestClose={setShowModal}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.btnStyle} onPress={setShowModal}>
            <Image source={Iconpack.BACK} style={styles.backIcon} />
            <Text style={styles.schoolTxt}>Close</Text>
          </TouchableOpacity>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Total Courses</Text>
            <Text style={styles.schoolTxt}>{item?.program_count ?? '-'}</Text>
          </View>

          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>City Name</Text>
            <Text style={styles.schoolTxt}>{item?.city_name ?? '-'}</Text>
          </View>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>University type</Text>
            <Text style={styles.schoolTxt}>{item?.public_private ?? '-'}</Text>
          </View>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>University rank</Text>
            <Text style={styles.schoolTxt}>{item?.school_rank ?? '-'}</Text>
          </View>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>University fees</Text>
            <Text style={styles.schoolTxt}>
              {!isEmpty(item.application_fee)
                ? `${item.application_fee} ${item.application_fee_currency}`
                : `34K ${item.application_fee_currency ?? ''}`}
            </Text>
          </View>

          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Nearby Airport</Text>
            <Text style={styles.schoolTxt}>{airport} KM</Text>
          </View>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Nearby Hospital</Text>
            <Text style={styles.schoolTxt}>{hospital} KM</Text>
          </View>

          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Nearby Mall</Text>
            <Text style={styles.schoolTxt}>{mall} KM</Text>
          </View>
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Nearby Transport</Text>
            <Text style={styles.schoolTxt}>{transport} KM</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Talk to an Expert for FREE"
              onPress={() => {
                Linking.openURL('tel:7715912608');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Modals;

const stylesheet = createStyleSheet(theme => ({
  flex: {flex: 1},
  backIcon: {height: 20, width: 20, marginRight: 10},
  row: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  rowCenterBW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonView: {
    paddingTop: 20,
    borderTopWidth: 0.9,
    borderTopColor: theme.colors.textColorHq,
    borderStyle: 'dashed',
  },
  schoolTxt: {
    color: theme.colors.textColorHq,
    fontSize: 15,
    fontWeight: '500',
  },
  modalView: {
    backgroundColor: theme.colors.lightWhite33,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnStyle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
}));
