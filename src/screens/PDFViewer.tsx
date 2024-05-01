import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import Iconpack from '../utils/Iconpack';
import {isEmpty} from '../utils/Helper';

export default class PDFViewer extends React.Component {
  render() {
    const {route} = this.props; // Access route prop
    console.log(route?.params?.item?.url, 'route');

    const source = {
      uri: !isEmpty(route?.params?.item?.url)
        ? route?.params?.item?.url
        : 'https://www.ets.org/pdfs/toefl/toefl-ibt-student-test-prep-planner.pdf',
      cache: true,
    };

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          trustAllCerts={false}
          onLoadComplete={numberOfPages => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
