import React, { FunctionComponent, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Button from '@src/components/molecules/Button';
import CustomInput from '@src/components/molecules/CustomInput';
import { colors } from '@src/constants';
import { UserData } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface ResIdCheck {
  resCode: string;
  detailMsg: string;
  trcNo: string;
  responseData: {
    dupYn: string;
  };
}

const InputInfo: FunctionComponent<Props> = function InputInfo() {
  const [idValue, setIdValue] = useState<string>('');
  const [idFocus, setIdFocus] = useState<boolean>(false);
  const [isIdAlert, setIsIdAlert] = useState<boolean>(false);
  const [isOverlab, setIsOverlab] = useState<boolean>(false);
  const [isUsableId, setIsUsableId] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [isPasswordAlert, setIsPasswordAlert] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<string>('');
  const [confirmFocus, setConfirmFocus] = useState<boolean>(false);
  const [isConfirmAlert, setIsConfirmAlert] = useState<boolean>(false);
  const navigation = useScreenNavigation();

  const emailRegex = /^[a-z0-9]+[a-z0-9]{4,19}$/g;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;

  const onButtonPress = () => {
    navigation.push('InfoCertification', {
      id: idValue,
      password,
    });
  };

  const onOverlabPress = () => {
    setIsUsableId(true);
    if (idCheckData.data === 'Y') {
      setIsOverlab(true);
    }
  };
  const axiosIdCheck = async () => {
    const body = {
      serviceCode: 'G001',
      chnl: '01',
      version: '1.0',
      trcNo: '20220630175000123456',
      requestData: {
        lognId: idValue,
      },
    };
    try {
      const response = await axios.post<ResIdCheck>(
        'https://appdev.happylpg.com/apis/hmsmob/mbr/chkDupLgnId',
        body,
      );
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  };

  const getFormattedIdCheck = async () => {
    const checkData = await axiosIdCheck();
    const formattedData = checkData.responseData.dupYn;
    return formattedData;
  };

  const idCheckData = useQuery(['idCheck', idValue], getFormattedIdCheck, {
    onSuccess: data => {
      return data;
    },
    onError: error => {
      return error;
    },
    // retry: false,
  });

  const checkOverlab = () => {
    return (
      idValue.length !== 0 &&
      (isIdAlert ? (
        <Text style={styles.textAlert}>
          영문, 숫자를 조합하여 5글자 이상 입력해주세요
        </Text>
      ) : (
        <Text style={styles.textAlert}>중복 확인을 해주세요</Text>
      ))
    );
  };

  const pressOverlab = () => {
    return isOverlab ? (
      <Text style={styles.textAlert}>중복된 아이디 입니다</Text>
    ) : (
      <Text style={styles.textUsable}>사용 가능한 아이디 입니다.</Text>
    );
  };

  useEffect(() => {
    setIsOverlab(false);
    setIsUsableId(false);
    if (!emailRegex.test(idValue)) {
      setIsIdAlert(true);
    } else {
      setIsIdAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idValue]);

  useEffect(() => {
    if (!passwordRegex.test(password)) {
      setIsPasswordAlert(true);
    } else {
      setIsPasswordAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (password !== confirm) {
      setIsConfirmAlert(true);
    } else {
      setIsConfirmAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.screenMargin}>
          <View style={styles.marginBottom}>
            <Text style={styles.title}>아이디∙비밀번호 및 차량번호를 </Text>
            <Text style={styles.title}>입력해주세요.</Text>
          </View>
          <View>
            <View style={styles.rowView}>
              <View style={styles.idleft}>
                <CustomInput
                  label="아이디"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="아이디 입력"
                  onChangeText={text => setIdValue(text)}
                  marginBottom={15}
                  value={idValue}
                  idFocus={idFocus}
                  onFocus={() => setIdFocus(true)}
                  onBlur={() => setIdFocus(false)}
                />
              </View>
              <View style={styles.idright}>
                <Button
                  label="중복확인"
                  buttonColor={colors.PRIMARY_600}
                  height="56px"
                  textColor={colors.WHITE}
                  textSize={16}
                  textWeight={700}
                  marginBottom={0}
                  onPress={onOverlabPress}
                />
              </View>
            </View>
            {isUsableId ? pressOverlab() : checkOverlab()}
            <CustomInput
              label="비밀번호"
              borderColor={colors.PRIMARY_600}
              height={52}
              placeholder="비밀번호 입력"
              onChangeText={text => setPassword(text)}
              marginBottom={15}
              isPassword
              value={password}
              idFocus={passwordFocus}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            {password.length !== 0 &&
              (isPasswordAlert ? (
                <Text style={styles.textAlert}>
                  영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상
                  입력해주세요.
                </Text>
              ) : null)}
            <CustomInput
              label="비밀번호 확인"
              borderColor={colors.PRIMARY_600}
              height={52}
              placeholder="비밀번호 재입력"
              onChangeText={text => setConfirm(text)}
              marginBottom={15}
              isPassword
              value={confirm}
              idFocus={confirmFocus}
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
            />
            {confirm.length !== 0 &&
              (isConfirmAlert ? (
                <Text style={styles.textAlert}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              ) : null)}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        {idValue &&
        password &&
        confirm &&
        isUsableId &&
        !isOverlab &&
        !isIdAlert &&
        !isPasswordAlert &&
        !isConfirmAlert ? (
          <Button
            label="다음"
            buttonColor={colors.PRIMARY_600}
            height="56px"
            textColor={colors.WHITE}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            onPress={onButtonPress}
          />
        ) : (
          <Button
            label="다음"
            buttonColor={colors.GRAY_400}
            height="56px"
            textColor={colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            disabled
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default InputInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonView: {
    width: '100%',
    height: 56,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  screenMargin: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  marginBottom: {
    marginBottom: 28,
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  idleft: {
    width: '59%',
  },
  idright: {
    width: '39%',
    paddingTop: 20,
  },
  textAlert: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  textUsable: {
    color: colors.PRIMARY_600,
    fontSize: 12,
    marginBottom: 10,
  },
});
