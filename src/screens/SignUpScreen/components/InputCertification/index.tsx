import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Button from '@src/components/molecules/Button';
import CustomInput from '@src/components/molecules/CustomInput';
import { colors } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
import BottomCertification, {
  BottomCertificationRef,
} from './components/BottomCerification';
import BottomGender, { BottomGenderRef } from './components/BottomGender';
import BottomService, { BottomServiceRef } from './components/BottomService';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const InputCertification: FunctionComponent<Props> =
  function InputCertification() {
    const CertifiactionRef = useRef<BottomCertificationRef>(null);
    const GenderRef = useRef<BottomGenderRef>(null);
    const ServiceRef = useRef<BottomServiceRef>(null);

    const [name, setName] = useState<string>('');
    const [nameFocus, setNameFocus] = useState<boolean>(false);

    const [birth, setBirth] = useState<string>('');
    const [birthFocus, setBirthFocus] = useState<boolean>(false);

    const [gender, setGender] = useState<string>('');
    const [genderFocus, setGenderFocus] = useState<boolean>(false);

    const [service, setService] = useState<string>('');
    const [serviceFocus, setServiceFocus] = useState<boolean>(false);

    return (
      <>
        <SafeAreaView style={styles.screen}>
          <ScrollView>
            <View style={styles.screenMargin}>
              <View style={styles.marginBottom}>
                <Text style={styles.title}>본인인증이 필요합니다.</Text>
              </View>
              <View>
                <CustomInput
                  label="이름"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="이름을 입력해 주세요"
                  onChangeText={text => setName(text)}
                  marginBottom={30}
                  idFocus={nameFocus}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  value={name}
                />
                <CustomInput
                  label="생년월일"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="생년월일 예) 1990716"
                  onChangeText={text => setBirth(text)}
                  marginBottom={30}
                  idFocus={birthFocus}
                  onFocus={() => setBirthFocus(true)}
                  onBlur={() => setBirthFocus(false)}
                  value={birth}
                />
                <CustomInput
                  label="성별"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="성별을 입력하세요"
                  // onChangeText={text => setGender(text)}
                  marginBottom={30}
                  onPressIn={() => GenderRef.current?.open()}
                  value={gender}
                  idFocus={genderFocus}
                  onFocus={() => setGenderFocus(true)}
                  onBlur={() => setGenderFocus(false)}
                  caretHidden
                />
                <CustomInput
                  label="통신사 선택"
                  borderColor={colors.PRIMARY_600}
                  height={52}
                  placeholder="통신사를 선택해주세요"
                  onChangeText={text => setService(text)}
                  marginBottom={30}
                  onPressIn={() => ServiceRef.current?.open()}
                  value={service}
                  idFocus={serviceFocus}
                  onFocus={() => setServiceFocus(true)}
                  onBlur={() => setServiceFocus(false)}
                  caretHidden
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonView}>
            <Button
              label="동의하고 가입"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              marginBottom={16}
              onPress={() => CertifiactionRef.current?.open()}
            />
          </View>
        </SafeAreaView>

        <BottomGender ref={GenderRef} isGender={setGender} />
        <BottomService ref={ServiceRef} isService={setService} />
        <BottomCertification ref={CertifiactionRef} />
      </>
    );
  };

export default InputCertification;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  screenMargin: {
    padding: 20,
  },
  buttonView: {
    width: '100%',
    height: 56,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  marginBottom: {
    marginBottom: 28,
  },
  bottomContent: {
    width: '100%',
    height: 51,
  },
  bottomHeader: {
    height: 64,
  },
  bottomHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 30,
  },
  bottomContentText: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 30,
  },
  bottomSheet: {
    backgroundColor: 'white',
    height: 200,
    width: '100%',
  },
  serviceBottomSheet: {
    backgroundColor: 'white',
    height: 380,
    width: '100%',
  },
});
