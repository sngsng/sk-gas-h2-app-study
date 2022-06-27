import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { icons } from '@src/assets';
import CustomCheckBox from '@src/components/atoms/CustomCheckBox';
import CustomCheckBoxRe from '@src/components/atoms/CustomCheckBoxRe';
import Button from '@src/components/molecules/Button';
import HorizonLine from '@src/components/molecules/HorizonLine';
import { colors } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export interface BottomCertificationRef {
  open: () => void;
  close: () => void;
}

const BottomCertification = forwardRef<BottomCertificationRef, Props>(
  (props, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const navigation = useScreenNavigation();

    const [isPrivacy, setIsPraivacy] = useState<boolean>(false);
    const [isSkPrivacy, setIsSkPrivacy] = useState<boolean>(false);
    const [isSkMarcketing, setIsSkMarcketing] = useState<boolean>(false);
    const [isUsePrivacy, setIsUsePrivacy] = useState<boolean>(false);
    const [isUseService, setIsUseService] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => sheetRef.current?.snapTo(0),
        close: () => sheetRef.current?.snapTo(1),
      }),
      [],
    );

    const onAllCheckedPress = () => {
      if (
        isPrivacy &&
        isSkPrivacy &&
        isSkMarcketing &&
        isUsePrivacy &&
        isUseService
      ) {
        setIsPraivacy(false);
        setIsSkMarcketing(false);
        setIsSkPrivacy(false);
        setIsUsePrivacy(false);
        setIsUseService(false);
      } else {
        setIsPraivacy(true);
        setIsSkMarcketing(true);
        setIsSkPrivacy(true);
        setIsUsePrivacy(true);
        setIsUseService(true);
      }
    };

    const onButtonPress = () => {
      navigation.navigate('Home');
    };

    const renderContent = () => (
      <View style={styles.bottomSheet}>
        <View style={styles.bottomHeader}>
          <Text style={styles.bottomHeaderText}>본인인증에 대한 약관 동의</Text>
          <CustomCheckBoxRe
            checkImage={icons.CANCEL}
            checkWidth={24}
            checkHeight={24}
            position
            Top={20}
            Right={33}
            onPress={() => sheetRef.current?.snapTo(1)}
          />
        </View>
        <HorizonLine />
        <View style={styles.buttonContent}>
          <View style={styles.rowView}>
            <TouchableOpacity onPressIn={onAllCheckedPress}>
              {isPrivacy &&
              isSkPrivacy &&
              isSkMarcketing &&
              isUsePrivacy &&
              isUseService ? (
                <CustomCheckBoxRe
                  checkImage={icons.TOGGLE}
                  checkWidth={20}
                  checkHeight={20}
                />
              ) : (
                <CustomCheckBoxRe
                  checkImage={icons.UN_TOGGLE}
                  checkWidth={20}
                  checkHeight={20}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.rowViewTitle}>전체 약관에 동의합니다.</Text>
          </View>
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
            <Text style={styles.rowViewContent}>(필수)</Text>
            <Text style={styles.rowviewBorder}>개인정보처리 방침 동의</Text>
          </View>
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isSkMarcketing}
              checkSetBool={setIsSkMarcketing}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(필수)</Text>
            <Text style={styles.rowviewBorder}>고유식별 정보 처리 동의</Text>
          </View>
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isUsePrivacy}
              checkSetBool={setIsUsePrivacy}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(필수)</Text>
            <Text style={styles.rowviewBorder}>개인정보 수집 이용 동의</Text>
          </View>
          <View style={styles.rowView}>
            <CustomCheckBox
              checkBool={isUseService}
              checkSetBool={setIsUseService}
              checkButtonImage={icons.UN_VECTOR}
              uncheckButtonImage={icons.VECTOR}
            />
            <Text style={styles.rowViewContent}>(필수)</Text>
            <Text style={styles.rowviewBorder}>통신사 이용약관 동의</Text>
          </View>
          {isPrivacy &&
          isSkPrivacy &&
          isSkMarcketing &&
          isUsePrivacy &&
          isUseService ? (
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
          ) : (
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
          )}
        </View>
      </View>
    );

    return (
      <BottomSheet
        ref={sheetRef}
        borderRadius={8}
        renderContent={renderContent}
        snapPoints={[440, 0]}
        initialSnap={1}
      />
    );
  },
);

export default BottomCertification;

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    height: 440,
    width: '100%',
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
  buttonContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
