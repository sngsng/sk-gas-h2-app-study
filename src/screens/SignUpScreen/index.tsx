import React, { FunctionComponent } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import SignUpAgreeMent from './components/SignUpAgreeMent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SingUpScreen: FunctionComponent<Props> = function SingUpScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <SignUpAgreeMent />
    </SafeAreaView>
  );
};

export default SingUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
