import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import AppInfo from './screens/AppInfo';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';
import PersonalPref from './screens/PersonalPref';
import UserPref from './screens/UserPref';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyWebComponent from './screens/Webview';
import {Image, View} from 'react-native';
import Iconpack from './utils/Iconpack';
import Menu from './components/Menu';
import PDFViewer from './screens/PDFViewer';
import ExamPortal from './screens/ExamPortal';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Feed" component={Feed} /> */}
      <Drawer.Screen
        options={{
          // headerShown: false,
          headerLeft: () => <Menu />,
          headerTitle: '',
        }}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{
          // headerShown: false,
          headerLeft: () => <Menu />,
          headerTitle: '',
        }}
        name="Exams"
        component={MyWebComponent}
      />
      <Drawer.Screen
        options={{
          // headerShown: false,
          headerLeft: () => <Menu />,
          headerTitle: '',
        }}
        name="Study"
        component={ExamPortal}
      />
    </Drawer.Navigator>
  );
}
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,

          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        name="AppInfo"
        component={AppInfo}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          // headerShown: !false,
          headerTitle: '',
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="PersonalPref"
        component={PersonalPref}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="UserPref"
        component={UserPref}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Home"
        component={Home}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="MyDrawer"
        component={MyDrawer}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="PDFViewer"
        component={PDFViewer}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
