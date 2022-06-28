import React, { FunctionComponent, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button } from '@src/components/molecules';
import { colors } from '@src/constants';
import InputCertification from '../SignUpScreen/components/InputCertification';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const FindidScreen: FunctionComponent<Props> = function FindidScreen() {
  const [isFindCheck, setIsFindCheck] = useState<boolean>(false);
  const onChangeButton = () => {
    console.log(isFindCheck);
    setIsFindCheck(!isFindCheck);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.headerButton}>
        <View style={styles.ButtonBox}>
          <Button
            label="간편 찾기"
            buttonColor={colors.GRAY_300}
            height="44px"
            textColor={colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            onPress={onChangeButton}
          />
        </View>
        <View style={styles.ButtonBox}>
          <Button
            label="간편 찾기"
            buttonColor={colors.GRAY_300}
            height="44px"
            textColor={colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
          />
        </View>
      </View>
      {isFindCheck ? (
        <InputCertification easyFind />
      ) : (
        <InputCertification certiFind />
      )}
    </View>
  );
};

export default FindidScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerButton: {
    height: 44,
    backgroundColor: colors.GRAY_300,
    flexDirection: 'row',
  },
  ButtonBox: {
    width: '50%',
  },
});
