import React, { FunctionComponent, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { Button } from '@src/components/molecules';
import { colors } from '@src/constants';
import { UserData } from '@src/data';
import { useScreenNavigation, useScreenRoute } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const AuthScreen: FunctionComponent<Props> = function AuthScreen() {
  const { params } = useScreenRoute<'Auth'>();
  const navigation = useScreenNavigation();

  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isSignUpModal, setIsSignUpModal] = useState<boolean>(false);

  console.log(params.certiBody);

  const onPhoneAuthPress = () => {
    console.log('params', params);
    const onFindAPI = async () => {
      const result = await axios.get<UserData[]>(
        'http://localhost:8081/public/datas/data.json',
      );
      if (result.data) {
        result.data.forEach(element => {
          if (element.phone === params.certiBody?.phone) {
            // console.log(element);
          }
        });
      }
    };

    const onSighUpAPI = async () => {
      const result = await axios.get<UserData[]>(
        'http://localhost:8081/public/datas/phoneNumber.json',
      );
      let data = null;
      if (result.data) {
        result.data.forEach(element => {
          if (!params.signUpData) return;

          const { id, password, ...res } = params.signUpData;

          if (JSON.stringify(element) === JSON.stringify(res)) {
            data = element;
          }
        });
        if (!data) setIsAuthError(true);
      }

      if (data) {
        let checked = null;
        const findPhone = await axios.get<UserData[]>(
          'http://localhost:8081/public/datas/data.json',
        );

        if (findPhone.data) {
          findPhone.data.forEach(element => {
            if (element.phone === params.signUpData?.phone) {
              checked = element;
              setIsSignUpModal(true);
            }
          });
        }
        if (!checked) {
          findPhone.data.push(params.signUpData as UserData);
        }
      }
    };

    if (params.certiBody || params.easyBody) {
      onFindAPI().catch(() => {});
    } else if (params.signUpData) {
      onSighUpAPI()
        .then(res => console.log('res', res))
        .catch(() => {});
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>인증 수단을 선택해주세요.</Text>
        <Button
          label="PASS 앱으로 인증하기"
          buttonColor={colors.PRIMARY_600}
          height="56px"
          textColor={colors.WHITE}
          textSize={16}
          textWeight={700}
          marginBottom={9}
        />
        <View style={styles.contentMargin}>
          <View style={styles.rowView}>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.content}>
              PASS 앱 푸시알림을 통한 본인인증을 완료한 후 위 버튼을
            </Text>
          </View>
          <Text style={styles.subContent}>
            눌러주시면 본인인증 절차가 완료됩니다.
          </Text>
          <View style={styles.rowView}>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.content}>
              푸시알림을 받지 못한 경우, 아래 버튼을 눌러 휴대폰
            </Text>
          </View>
          <Text style={styles.subContent}>문자인증을 절차를 완료해주세요.</Text>
        </View>
        <Button
          label="휴대폰번호로 인증하기"
          textColor={colors.PRIMARY_600}
          textSize={16}
          borderWidth={2}
          borderColor={colors.PRIMARY_600}
          textWeight={700}
          height="56px"
          marginBottom={9}
          onPress={onPhoneAuthPress}
        />
        <View style={styles.rowView}>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.content}>
            입력하신 핸드폰 번호로 발송된 보안코드를 통해
          </Text>
        </View>
        <Text style={styles.subContent}>본인인증을 진행합니다.</Text>
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={isSignUpModal}
        onRequestClose={() => {
          setIsSignUpModal(!isSignUpModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>가입 확인</Text>
            <View style={styles.modalContent}>
              <Text>이미 가입된 회원입니다.</Text>
              <Text>로그인화면으로 이동합니다.</Text>
            </View>
            <Button
              label="확인"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              onPress={() => {
                setIsSignUpModal(false);
                navigation.reset({
                  routes: [
                    {
                      name: 'Signin',
                    },
                  ],
                });
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={isAuthError}
        onRequestClose={() => {
          setIsAuthError(!isAuthError);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>인증번호 오류</Text>
            <View style={styles.modalContent}>
              <Text>본인핸드폰으로 발송된 SMS 문자의</Text>
              <Text>인증번호를 확인해주세요</Text>
            </View>
            <Button
              label="확인"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              onPress={() => {
                setIsAuthError(false);
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
  },
  rowView: {
    flexDirection: 'row',
  },
  dot: {
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.GRAY_600,
  },
  subContent: {
    marginLeft: 14,
    fontSize: 14,
    color: colors.GRAY_600,
  },
  contentMargin: {
    marginBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  modalView: {
    alignItems: 'center',
    shadowColor: '#333333',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    width: 269,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalContent: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 2,
    alignItems: 'center',
  },
});
