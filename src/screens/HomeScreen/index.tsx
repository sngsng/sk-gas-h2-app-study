import React, { FunctionComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { UserData } from '@src/data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HomeScreen: FunctionComponent<Props> = function HomeScreen() {
  const [userData, setUserData] = useState<UserData>();
  AsyncStorage.getItem('loginUser', (err, result) => {
    if (err) {
      return;
    }
    if (result) {
      const user = JSON.parse(result) as UserData;
      setUserData(user);
    }
  }).catch(() => {});
  return (
    <SafeAreaView>
      <Text>{userData?.id}</Text>
      <Text>{userData?.name}</Text>
      <Text>{userData?.birth}</Text>
      <Text>{userData?.gender}</Text>
      <Text>{userData?.service}</Text>
      <Text>{userData?.phone}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
