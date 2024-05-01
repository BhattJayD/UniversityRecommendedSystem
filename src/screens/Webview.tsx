import React from 'react';
import {WebView} from 'react-native-webview';

// ...
const MyWebComponent = () => {
  return (
    <WebView
      source={{uri: 'https://www.bestmytest.com/toefl/app/user/login'}}
      style={{flex: 1}}
    />
  );
};
export default MyWebComponent;
