import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '@src/screens/AuthScreen';
import FindidScreen from '@src/screens/FindIdScreen';
import HomeScreen from '@src/screens/HomeScreen';
import MainScreen from '@src/screens/MainScreen';
import SigninScreen from '@src/screens/SignInScreen';
import SingUpScreen from '@src/screens/SignUpScreen';
import InputCertification from '@src/screens/SignUpScreen/components/InputCertification';
import InputInfo from '@src/screens/SignUpScreen/components/InputInfo';
import SignUpComplete from '@src/screens/SignUpScreen/components/SignUpComplete';
import TutorialScreen from '@src/screens/TutorialScreen';
import { RootStackParams } from '../types';

const Stack = createNativeStackNavigator<RootStackParams>();
const RootStackNavigator = function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Tutorial'}
        component={TutorialScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'Main'}
        component={MainScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'Signin'}
        component={SigninScreen}
        options={{ headerShown: true, headerTitle: '로그인' }}
      />
      <Stack.Screen
        name={'Signup'}
        component={SingUpScreen}
        options={{
          headerShown: true,
          headerTitle: '회원가입',
          animation: Platform.select({
            android: 'slide_from_left',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={'InfoInput'}
        component={InputInfo}
        options={{
          headerShown: true,
          headerTitle: '회원가입',
          animation: Platform.select({
            android: 'slide_from_left',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={'InfoCertification'}
        component={InputCertification}
        options={{
          headerShown: true,
          headerTitle: '회원가입',
          animation: Platform.select({
            android: 'slide_from_right',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={'SignUpComplete'}
        component={SignUpComplete}
        options={{
          headerShown: true,
          headerTitle: '회원가입',
          animation: Platform.select({
            android: 'slide_from_left',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={'FindId'}
        component={FindidScreen}
        options={{
          headerShown: true,
          headerTitle: '아이디 찾기',
          animation: Platform.select({
            android: 'slide_from_right',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />

      <Stack.Screen
        name={'Auth'}
        component={AuthScreen}
        options={{
          headerShown: true,
          headerTitle: '아이디 찾기',
          animation: Platform.select({
            android: 'slide_from_right',
            ios: 'simple_push',
          }),
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
