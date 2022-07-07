import React, { FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useQuery } from 'react-query';
import axios from 'axios';
import { colors } from '@src/constants';
import { ResTermsDetail } from '@src/data';
import { useScreenRoute } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TermsDetailScreen: FunctionComponent<Props> =
  function TermsDetailScreen() {
    const { params } = useScreenRoute<'TermsDetail'>();
    const body = {
      serviceCode: 'G001',
      chnl: '01',
      version: '1.0',
      trcNo: '20220103100000123456',
      requestData: {
        cluCd: params.terms.cluCd,
        cluVer: params.terms.cluVer,
      },
    };
    const axiosTermsDetail = async () => {
      try {
        const response = await axios.post<ResTermsDetail>(
          'https://appdev.happylpg.com/apis/hmsmob/mbr/cluDet',
          body,
        );
        return response.data;
      } catch (error) {
        throw new Error('error');
      }
    };

    const getFormattedTermsDetail = async () => {
      const termsDetail: ResTermsDetail = await axiosTermsDetail();
      const formattedDetail = termsDetail.responseData.cluTelgCtt;
      return formattedDetail;
    };

    const termsData = useQuery('termsDetail', getFormattedTermsDetail, {
      onSuccess: data => {
        return data;
      },
      onError: error => {
        return error;
      },
    });

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <WebView
            source={{
              html:
                `<haed><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></head>${
                  termsData.data || ''
                }` || '',
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

export default TermsDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
});
