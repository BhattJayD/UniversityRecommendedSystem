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
  hostel,
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
          <View style={styles.rowCenterBW}>
            <Text style={styles.schoolTxt}>Nearby Hostels</Text>
            <Text style={styles.schoolTxt}>{hostel} KM</Text>
          </View>

          <View style={styles.buttonView}>
            <Text style={[styles.schoolTxt, styles.color]}>
              Talk to an Expert :-
            </Text>

            <View style={styles.rowBw}>
              <Text
                onPress={() => {
                  Linking.openURL('tel:9136504782');
                }}
                style={[styles.schoolTxt, styles.call]}>
                Rajas Karandikar
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL('tel:7715912608');
                }}
                style={[styles.schoolTxt, styles.call]}>
                Sakshi Raorane
              </Text>
            </View>
            <View style={styles.rowBw}>
              <Text
                onPress={() => {
                  Linking.openURL('tel:7738291269');
                }}
                style={[styles.schoolTxt, styles.call]}>
                Jainil Sampat
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL('tel:8104826492');
                }}
                style={[styles.schoolTxt, styles.call]}>
                Vrushabh Bhandare
              </Text>
            </View>
            {/* <Button
              title="Talk to an Expert for FREE"
              onPress={() => {
                Linking.openURL('tel:7715912608');
              }}
            /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Modals;

const stylesheet = createStyleSheet(theme => ({
  flex: {flex: 1, backgroundColor: 'red'},
  backIcon: {height: 20, width: 20, marginRight: 10},
  row: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  rowCenterBW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonView: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.textColorHq,
    marginTop: 5,
    borderStyle: 'dashed',
  },
  schoolTxt: {
    color: theme.colors.textColorHq,
    fontSize: 15,
    fontWeight: '500',
  },
  modalView: {
    backgroundColor: '#FEFBF3',
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
  color: {
    color: theme.colors.buttonColor,
    marginBottom: 10,
    textDecorationLine: 'underline',
    direction: 'inherit',
  },
  call: {
    textDecorationLine: 'underline',
    direction: 'inherit',
    color: theme.colors.blue,
  },
  rowBw: {flexDirection: 'row', justifyContent: 'space-between'},
}));
