import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppInfo from './screens/AppInfo';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AppInfo"
        component={AppInfo}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
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
