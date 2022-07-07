import React, { FunctionComponent, useState } from 'react';
import {
  Dimensions,
  ImageURISource,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import Corousel from 'react-native-snap-carousel';
import { images } from '@src/assets';
import Button from '@src/components/molecules/Button';
import { colors } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

type TutorialListData = {
  // readonly index: number;
  readonly image: ImageSourcePropType & ImageURISource;
  readonly title: string;
  readonly title2: string;
};

const TutorialScreen: FunctionComponent<Props> = function TutorialScreen() {
  const navigation = useScreenNavigation();
  const windowWidth = Dimensions.get('screen');
  const [indexPage, setIndexPage] = useState<number>(0);
  const pageData = [
    {
      // index: 1,
      image: images.TUTORIAL1,
      title: '수소차 충전 불편하셨죠?',
      title2: '하이앤드로 한 번에 끝!',
    },
    {
      // index: 2,
      image: images.TUTORIAL2,
      title: '내 주변 충전소를',
      title2: '손쉽게 검색!',
    },
    {
      // index: 3,
      image: images.TUTORIAL3,
      title: '현장에서 대기는 No!',
      title2: '미리 충전 예약',
    },
    {
      // index: 4,
      image: images.TUTORIAL4,
      title: '결제 수단 등록하고',
      title2: '원터치로 할인/결제',
    },
    {
      // index: 5,
      image: images.TUTORIAL5,
      title: '충전소 별 주요 정보를',
      title2: '실시간 조회!',
    },
  ];
  const onSkipPress = () => {
    navigation.navigate('Main');
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: TutorialListData;
    index: number;
  }) => {
    return (
      <View style={styles.corouselScreen}>
        <Text style={styles.title1}>{item.title}</Text>
        <Text style={styles.title2}>{item.title2}</Text>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Corousel
          onSnapToItem={c => setIndexPage(c)}
          sliderWidth={windowWidth.width}
          itemWidth={windowWidth.width}
          data={pageData}
          renderItem={renderItem}
        />
        {indexPage === 4 ? (
          <View style={styles.button}>
            <Button
              label="로그인"
              buttonColor={colors.PRIMARY_600}
              height="56px"
              textColor={colors.WHITE}
              textSize={16}
              textWeight={700}
              marginBottom={16}
              onPress={onSkipPress}
            />
          </View>
        ) : (
          <Text style={styles.skip} onPress={onSkipPress}>
            Skip
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    // margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corouselScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  imageStyle: {
    width: '80%',
    height: '80%',
  },
  title1: {
    fontSize: 20,
    fontWeight: '400',
  },
  title2: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 32,
  },
  skip: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.GRAY_600,
  },
  button: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
