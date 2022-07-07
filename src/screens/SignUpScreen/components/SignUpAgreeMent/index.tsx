import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { icons } from '@src/assets';
import { CustomCheckBoxRe } from '@src/components/atoms';
import CustomCheckBox from '@src/components/atoms/CustomCheckBox';
import { Button } from '@src/components/molecules';
import HorizonLine from '@src/components/molecules/HorizonLine';
import { colors } from '@src/constants';
import { TermsList, ResTerms, Terms } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SignUpAgreeMent: FunctionComponent<Props> = function SignUpAgreeMent() {
  const navigation = useScreenNavigation();

  let requireNum = 0;
  const [lastLength, setLastLength] = useState<number>(0);

  const onButtonPress = () => {
    navigation.navigate('InfoInput');
  };

  const body = {
    serviceCode: 'G001',
    chnl: '01',
    version: '1.0',
    trcNo: '20220103100000123456',
    requestData: {
      svcCluFg: '01',
    },
  };

  const axiosTermsList = async () => {
    try {
      const response = await axios.post<ResTerms>(
        'https://appdev.happylpg.com/apis/hmsmob/mbr/cluList',
        body,
      );
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  };

  const getFormattedTermsList = async (): Promise<Terms[]> => {
    const termsList: ResTerms = await axiosTermsList();
    return termsList.responseData.cluList;
  };

  const { data } = useQuery<Terms[], AxiosError>(
    'terms',
    getFormattedTermsList,
  );

  const [termsList, setTermsList] = useState<TermsList[]>();

  useEffect(() => {
    if (!data) return;
    const fetchList = data.map(element => {
      return {
        ...element,
        isChecked: false,
      };
    });
    setTermsList(fetchList);
  }, [data]);

  const allCheck = termsList
    ?.map(terms => {
      return terms.isChecked;
    })
    .every(value => value === true);

  const onAllCheckedPress = () => {
    const result = termsList?.map(terms => {
      return {
        ...terms,
        isChecked: !allCheck,
      };
    });
    setTermsList(result);
  };

  const isSomeTrue = termsList
    ?.map(terms => {
      return terms.isChecked;
    })
    .slice(0, 3)
    .every(value => {
      return value === true;
    });

  const getCheckImage = () => {
    return allCheck ? icons.TOGGLE : icons.UN_TOGGLE;
  };

  const onTermsDetailPress = (term: TermsList) => {
    navigation.navigate('TermsDetail', { term });
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
          {termsList?.map(terms => {
            if (terms.mndtAgrYn === 'Y') requireNum += 1;
            return (
              <View key={terms.cluCd} style={styles.rowView}>
                <CustomCheckBox
                  cluCd={terms.cluCd}
                  isChecked={terms.isChecked}
                  checkSetBool={termsKey => {
                    if (!termsList) return;
                    const checked = termsList?.map(element => {
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
                <Text style={styles.rowViewContent}>{`${
                  terms.mndtAgrYn === 'Y' ? '(필수)' : '(선택)'
                }`}</Text>
                <Text
                  style={styles.rowviewBorder}
                  onPress={() => onTermsDetailPress(terms)}
                >
                  {terms.cluShrtCtt}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          label="동의하고 가입"
          buttonColor={isSomeTrue ? colors.PRIMARY_600 : colors.GRAY_400}
          height="56px"
          textColor={isSomeTrue ? colors.WHITE : colors.GRAY_600}
          ß
          textSize={16}
          textWeight={700}
          marginBottom={16}
          onPress={onButtonPress}
          disabled={!isSomeTrue}
        />
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
