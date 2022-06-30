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
    setIsFindCheck(!isFindCheck);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.headerButton}>
        <View style={styles.ButtonMargin}>
          <View style={styles.ButtonBox}>
            <Button
              label="간편 찾기"
              buttonColor={!isFindCheck ? colors.WHITE : colors.GRAY_300}
              height="44px"
              textColor={!isFindCheck ? colors.PRIMARY_600 : colors.GRAY_600}
              textSize={16}
              textWeight={700}
              marginBottom={16}
              onPress={onChangeButton}
            />
          </View>
          <View style={styles.ButtonBox}>
            <Button
              label="본인인증으로 찾기"
              buttonColor={isFindCheck ? colors.WHITE : colors.GRAY_300}
              height="44px"
              textColor={isFindCheck ? colors.PRIMARY_600 : colors.GRAY_600}
              textSize={16}
              textWeight={700}
              marginBottom={16}
              onPress={onChangeButton}
            />
          </View>
        </View>
      </View>
      {isFindCheck ? (
        <InputCertification certiFind />
      ) : (
        <InputCertification easyFind />
      )}
    </View>
  );
};

export default FindidScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerButton: {
    height: 52,
    marginTop: 24,
  },
  ButtonBox: {
    width: '50%',
    paddingRight: 4,
    paddingLeft: 4,
    marginTop: 4,
  },
  ButtonMargin: {
    backgroundColor: colors.GRAY_300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});
