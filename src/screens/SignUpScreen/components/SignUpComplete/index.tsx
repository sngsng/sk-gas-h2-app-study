import React, { FunctionComponent } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@src/components/molecules';
import { colors } from '@src/constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SignUpComplete: FunctionComponent<Props> = function SignUpComplete() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Text>가입완료</Text>
          <Text>이제 충전소에서 대기하지 마세요.</Text>
        </View>
      </ScrollView>

      <Button
        label="로그인"
        buttonColor={colors.PRIMARY_600}
        height="56px"
        textColor={colors.WHITE}
        textSize={16}
        textWeight={700}
      />
    </SafeAreaView>
  );
};

export default SignUpComplete;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
});
