import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import AppInfo from './screens/AppInfo';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

function MyStack() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="AppInfo"
        component={AppInfo}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Profile',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Login"
        component={Login}
      />
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
