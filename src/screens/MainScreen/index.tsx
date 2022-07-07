import React, { FunctionComponent } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@src/assets';
import Button from '@src/components/molecules/Button';
import { colors } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MainScreen: FunctionComponent<Props> = function MainScreen() {
  const navigation = useScreenNavigation();
  const onSignupPress = () => {
    navigation.navigate('Signup');
  };

  const onSigninPress = () => {
    navigation.navigate('Signin');
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.logoView}>
          <Text style={styles.logoText}>수소차 충전의 모든 것</Text>
          <Image source={images.LOGO} style={styles.logo} />
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <View style={styles.buttonBottom}>
          <Button
            label="회원가입"
            textColor={colors.PRIMARY_600}
            textSize={16}
            borderWidth={2}
            borderColor={colors.PRIMARY_600}
            textWeight={700}
            height="56px"
            onPress={onSignupPress}
          />
        </View>
        <Button
          label="로그인"
          buttonColor={colors.PRIMARY_600}
          height="56px"
          textColor={colors.WHITE}
          textSize={16}
          textWeight={700}
          onPress={onSigninPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  logoView: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    width: '100%',
    height: 128,
  },
  logo: {
    width: 147,
    height: 80,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 21,
  },
  buttonBottom: {
    marginBottom: 16,
  },
});
