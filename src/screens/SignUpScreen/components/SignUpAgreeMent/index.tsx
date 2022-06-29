import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '@src/assets';
import CustomCheckBox from '@src/components/atoms/CustomCheckBox';
import CustomCheckBoxRe from '@src/components/atoms/CustomCheckBoxRe';
import Button from '@src/components/molecules/Button';
import HorizonLine from '@src/components/molecules/HorizonLine';
import { colors } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SignUpAgreeMent: FunctionComponent<Props> = function SignUpAgreeMent() {
  const navigation = useScreenNavigation();
  const [isPrivacy, setIsPraivacy] = useState<boolean>(false);
  const [isSkPrivacy, setIsSkPrivacy] = useState<boolean>(false);
  const [isSkMarcketing, setIsSkMarcketing] = useState<boolean>(false);

  const onAllCheckedPress = () => {
    if (isPrivacy && isSkPrivacy && isSkMarcketing) {
      setIsPraivacy(false);
      setIsSkMarcketing(false);
      setIsSkPrivacy(false);
    } else {
      setIsPraivacy(true);
      setIsSkMarcketing(true);
      setIsSkPrivacy(true);
    }
  };

  const getCheckImage = () => {
    return isPrivacy && isSkPrivacy && isSkMarcketing
      ? icons.TOGGLE
      : icons.UN_TOGGLE;
  };

  const onButtonPress = () => {
    navigation.navigate('InfoInput');
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Text style={styles.title}>약관 동의가 필요해요.</Text>
          <Text style={styles.content}>
            소유 차량의 정확한 데이터 조회와 보다 쉬운 하이엔드로 서비스 제공을
            위해 꼭 필요합니다.
          </Text>
        </View>
        <View style={styles.certMargin}>
          <Pressable style={styles.rowView} onPressIn={onAllCheckedPress}>
            <CustomCheckBoxRe
              onPressIn={onAllCheckedPress}
              checkImage={getCheckImage()}
              checkWidth={20}
              checkHeight={20}
            />
            <Text style={styles.rowViewTitle}>전체 약관에 동의합니다.</Text>
          </Pressable>
          <HorizonLine />
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isPrivacy}
              checkSetBool={setIsPraivacy}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(필수)</Text>
            <Text style={styles.rowviewBorder}>개인정보 수집 및 이용동의</Text>
          </View>
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isSkPrivacy}
              checkSetBool={setIsSkPrivacy}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(선택)</Text>
            <Text style={styles.rowviewBorder}>
              SK가스 개인(신용) 정보의 수집, 이용에 관한 사항
            </Text>
          </View>
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isSkMarcketing}
              checkSetBool={setIsSkMarcketing}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(선택)</Text>
            <Text style={styles.rowviewBorder}>
              SK가스 마케팅 수신, 개인정보 제공 동의
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        {!isPrivacy ? (
          <Button
            label="동의하고 가입"
            buttonColor={colors.GRAY_400}
            height="56px"
            textColor={colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            disabled
          />
        ) : (
          <Button
            label="동의하고 가입"
            buttonColor={colors.PRIMARY_600}
            height="56px"
            textColor={colors.WHITE}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            onPress={onButtonPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignUpAgreeMent;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
    margin: 20,
  },
  buttonView: {
    width: '100%',
    height: 56,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  rowViewTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 10,
  },
  rowViewContent: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  rowviewBorder: {
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  certMargin: {
    marginTop: 58,
  },
});
