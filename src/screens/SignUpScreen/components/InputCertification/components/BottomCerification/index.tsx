import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { icons } from '@src/assets';
import { CustomCheckBox, CustomCheckBoxRe } from '@src/components/atoms';
import { Button, HorizonLine } from '@src/components/molecules';
import { colors } from '@src/constants';
import { CertiBody } from '@src/data';
import { useScreenNavigation, useScreenRoute } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  userData: CertiBody;
}

export interface BottomCertificationRef {
  open: () => void;
  close: () => void;
}

const BottomCertification = forwardRef<BottomCertificationRef, Props>(
  ({ userData }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const navigation = useScreenNavigation();
    const { params } = useScreenRoute<'Auth'>();

    const [termsList, setTermsList] = useState([
      {
        cluCd: 'terms1chk',
        cluShrtCtt: '개인정보 이용 동의 여부',
        isChecked: false,
      },
      {
        cluCd: 'terms2chk',
        cluShrtCtt: '고유식별 정보 처리 동의',
        isChecked: false,
      },
      {
        cluCd: 'terms3chk',
        cluShrtCtt: '통신사 이용약관 동의',
        isChecked: false,
      },
      {
        cluCd: 'terms4chk',
        cluShrtCtt: '서비스 이용약관 동의 여부',
        isChecked: false,
      },
    ]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => sheetRef.current?.snapTo(0),
        close: () => sheetRef.current?.snapTo(1),
      }),
      [],
    );

    console.log('bottom', userData);

    const certiReq = {
      phoneNo: userData.phone,
      name: userData.name,
      birthday: userData.birth,
      gender: userData.gender,
      phoneCorp: userData.service,
      nation: '0',
    };

    // console.log(
    //   'tt',
    //   termsList.map(element => {
    //     if (element.isChecked === true) {
    //       const key = Object.fromEntries(element);
    //       return key;
    //     }
    //   }),
    // );

    const allCheck = termsList
      .map(terms => {
        return terms.isChecked;
      })
      .every(value => value === true);
    const onAllCheckedPress = () => {
      const result = termsList.map(terms => {
        return {
          ...terms,
          isChecked: !allCheck,
        };
      });
      setTermsList(result);
    };

    const onButtonPress = () => {
      // const result = Object.assign(userData, params);

      // 현재 input 데이터
      navigation.navigate('Auth', { certiBody: certiReq });
      sheetRef.current?.snapTo(1);
    };

    const getCheckImage = () => {
      return allCheck ? icons.TOGGLE : icons.UN_TOGGLE;
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
            <CustomCheckBoxRe
              checkImage={getCheckImage()}
              checkWidth={20}
              checkHeight={20}
              onPress={onAllCheckedPress}
            />
            <Text style={styles.rowViewTitle} onPress={onAllCheckedPress}>
              전체 약관에 동의합니다.
            </Text>
          </View>
          <HorizonLine />
          {termsList.map(terms => {
            return (
              // <Pressable onPress={() => terms.termsChk}>
              <View style={styles.rowView}>
                <CustomCheckBox
                  cluCd={terms.cluCd}
                  isChecked={terms.isChecked}
                  checkSetBool={termsKey => {
                    const checked = termsList.map(element => {
                      if (element.cluCd === termsKey) {
                        return {
                          ...element,
                          isChecked: !element.isChecked,
                        };
                      }
                      return element;
                    });
                    setTermsList(checked);
                  }}
                  checkButtonImage={icons.UN_VECTOR}
                  uncheckButtonImage={icons.VECTOR}
                />
                <Text style={styles.rowViewContent}>(필수)</Text>
                <Text style={styles.rowviewBorder}>{terms.cluShrtCtt}</Text>
              </View>
              // </Pressable>
            );
          })}
          <Button
            label="동의하고 가입"
            buttonColor={allCheck ? colors.PRIMARY_600 : colors.GRAY_400}
            height="56px"
            textColor={allCheck ? colors.WHITE : colors.GRAY_600}
            textSize={16}
            textWeight={700}
            marginBottom={16}
            onPress={onButtonPress}
            disabled={!allCheck}
          />
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
        enabledContentGestureInteraction={false}
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
