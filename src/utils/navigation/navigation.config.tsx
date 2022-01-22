import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationRoutes from './navigation.routes';
import SignInScreen from '../../screens/authentication/signin.screen';
import SignUpScreen from '../../screens/authentication/signup.screen';

const {
  auth: {signin, signup},
} = NavigationRoutes;
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={signin}
      component={SignInScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name={signup}
      component={SignUpScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const NavigationConfig = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default NavigationConfig;
