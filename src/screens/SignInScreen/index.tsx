import React, { FunctionComponent, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Button from '@src/components/molecules/Button';
import CustomInput from '@src/components/molecules/CustomInput';
import { colors } from '@src/constants';
import { UserData } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface Body {
  id: string;
  password: string;
}

const SigninScreen: FunctionComponent<Props> = function SigninScreen() {
  const navigation = useScreenNavigation();
  const [idValue, setIdValue] = useState<string>('');
  const [idFocus, setIdFocus] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  let body: Body = {
    id: '',
    password: '',
  };

  // modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalPassVisible, setModalPassVisible] = useState<boolean>(false);

  const onLoginPress = () => {
    // (data as UserData[]).filter()
    const userAPI = async () => {
      try {
        const result = await axios.get<UserData[]>(
          'http://localhost:8081/public/datas/data.json',
        );
        if (result.data) {
          result.data.forEach(element => {
            if (element.id === idValue) {
              body.id = element.id;
              if (element.password === password) {
                body = element;
              }
            }
          });
        }
        if (body.id === '') return setModalVisible(true);
        if (body.password === '') return setModalPassVisible(true);
        AsyncStorage.setItem('loginUser', JSON.stringify(body)).catch(() => {});
        navigation.navigate('Home');
        return body;
      } catch (error) {
        return error;
      }
    };

    userAPI().catch(() => {});
  };

  const onCompletePress = () => {
    setModalVisible(false);
    setModalPassVisible(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.loginText}>?????????</Text>
        </View>
        <CustomInput
          label="?????????"
          borderColor={colors.PRIMARY_600}
          height={52}
          placeholder="?????????"
          onChangeText={text => setIdValue(text)}
          idFocus={idFocus}
          onFocus={() => setIdFocus(true)}
          onBlur={() => setIdFocus(false)}
          value={idValue}
          marginBottom={16}
        />

        <CustomInput
          label="????????????"
          borderColor={colors.PRIMARY_600}
          height={52}
          placeholder="???????????? ??????"
          onChangeText={text => setPassword(text)}
          value={password}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          idFocus={passwordFocus}
          marginBottom={16}
        />
        {idValue && password ? (
          <Button
            label="?????????"
            buttonColor={colors.PRIMARY_600}
            height="56px"
            textColor={colors.WHITE}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            onPress={onLoginPress}
          />
        ) : (
          <Button
            label="?????????"
            buttonColor={colors.GRAY_400}
            height="56px"
            textColor={colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            disabled
          />
        )}
        <Text style={styles.textFind}>????????? / ???????????? ??????</Text>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>????????? ??????</Text>
            <View style={styles.modalContent}>
              <Text>??????????????? ????????????.</Text>
              <Text>???????????? ??????????????????.</Text>
            </View>
            <Button
              label="??????"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              onPress={onCompletePress}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent
        visible={modalPassVisible}
        onRequestClose={() => {
          setModalPassVisible(!modalPassVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>???????????? ??????</Text>
            <View style={styles.modalContent}>
              <Text>???????????? ??????????????? ???????????? ????????????.</Text>
              <Text>??????????????? 5??? ?????? ?????? ?????? ????????????</Text>
              <Text>??????????????? ???????????????.</Text>
            </View>
            <Button
              label="??????"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              onPress={onCompletePress}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    margin: 20,
  },
  textFind: {
    width: '100%',
    textAlign: 'center',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  loginBox: {
    width: '100%',
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '700',
  },
});
