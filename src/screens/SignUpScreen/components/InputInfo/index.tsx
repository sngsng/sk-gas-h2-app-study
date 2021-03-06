import React, { FunctionComponent, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Button from '@src/components/molecules/Button';
import CustomInput from '@src/components/molecules/CustomInput';
import { colors } from '@src/constants';
import { UserData } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

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

  const emailRegex = /([a-zA-Z+]|([0-9])).{5,25}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;
  const onButtonPress = () => {
    navigation.push('InfoCertification');
  };

  const onOverlabPress = () => {
    const userAPI = async () => {
      try {
        const result = await axios.get<UserData[]>(
          'http://localhost:8081/public/datas/data.json',
        );
        if (result.data) {
          result.data.forEach(element => {
            if (element.id === idValue) {
              setIsOverlab(true);
              // setIsIdAlert(false);
            }
          });
          setIsUsableId(true);
        }
        return result;
      } catch (error) {
        return error;
      }
    };

    userAPI().catch(() => {});
  };

  const checkOverlab = () => {
    if (idValue.length !== 0) {
      if (isIdAlert) {
        return (
          <Text style={styles.textAlert}>
            ??????, ????????? ???????????? 5?????? ?????? ??????????????????.
          </Text>
        );
      }
      if (!isIdAlert) {
        return isOverlab ? (
          <Text>????????? ????????? ?????????.</Text>
        ) : (
          <Text>??????????????? ????????????.</Text>
        );
      }
    }
    return null;
  };

  useEffect(() => {
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
            <Text style={styles.title}>???????????????????????? ??? ??????????????? </Text>
            <Text style={styles.title}>??????????????????.</Text>
          </View>
          <View>
            <View style={styles.rowView}>
              <View style={styles.idleft}>
                <CustomInput
                  label="?????????"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="????????? ??????"
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
                  label="????????????"
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
            {isUsableId ? (
              <Text>??????????????? ????????? ?????????.</Text>
            ) : (
              checkOverlab()
            )}
            <CustomInput
              label="????????????"
              borderColor={colors.PRIMARY_600}
              height={52}
              placeholder="???????????? ??????"
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
                  ?????? ????????????, ??????, ??????????????? ???????????? 8??? ??????
                  ??????????????????.
                </Text>
              ) : null)}
            <CustomInput
              label="???????????? ??????"
              borderColor={colors.PRIMARY_600}
              height={52}
              placeholder="???????????? ?????????"
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
                  ??????????????? ???????????? ????????????.
                </Text>
              ) : null)}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          label="??????"
          buttonColor={colors.PRIMARY_600}
          height="56px"
          textColor={colors.WHITE}
          textSize={16}
          textWeight={700}
          marginBottom={16}
          onPress={onButtonPress}
        />
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
});
