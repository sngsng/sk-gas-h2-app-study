import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { icons } from '@src/assets';
import CustomCheckBoxRe from '@src/components/atoms/CustomCheckBoxRe';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  isService: Dispatch<SetStateAction<string>>;
}

export interface BottomServiceRef {
  open: () => void;
  close: () => void;
}

const BottomService = forwardRef<BottomServiceRef, Props>(
  ({ isService }, ref) => {
    const genderRef = React.useRef<BottomSheet>(null);
    const [service, setService] = React.useState<string>('');

    useImperativeHandle(
      ref,
      () => ({
        open: () => genderRef.current?.snapTo(0),
        close: () => genderRef.current?.snapTo(1),
      }),
      [],
    );

    const serviceContent = () => (
      <View style={styles.bottomSheet}>
        <View style={styles.bottomHeader}>
          <Text style={styles.bottomHeaderText}>통신사를 선택해주세요.</Text>
          <CustomCheckBoxRe
            checkImage={icons.CANCEL}
            checkWidth={24}
            checkHeight={24}
            position
            Top={20}
            Right={33}
            onPress={() => genderRef.current?.snapTo(1)}
          />
        </View>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('SKT');
            isService('SKT');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>SKT</Text>
          {service === 'SKT' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('KTF');
            isService('KTF');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>KT</Text>
          {service === 'KTF' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('LGT');
            isService('LGT');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>LG</Text>
          {service === 'LGT' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('SKM');
            isService('SKM');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>SKT 알뜰폰</Text>
          {service === 'SKM' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('KTM');
            isService('KTM');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>KT 알뜰폰</Text>
          {service === 'KTM' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
        <Pressable
          style={styles.bottomContent}
          onPress={() => {
            setService('LGM');
            isService('LGM');
            genderRef.current?.snapTo(1);
          }}
        >
          <Text style={styles.bottomContentText}>LG 알뜰폰</Text>
          {service === 'LGM' ? (
            <CustomCheckBoxRe
              checkImage={icons.UN_VECTOR}
              checkWidth={30}
              checkHeight={30}
              position
              Top={-7}
              Right={30}
            />
          ) : null}
        </Pressable>
      </View>
    );
    return (
      <BottomSheet
        ref={genderRef}
        snapPoints={[400, 0]}
        borderRadius={8}
        renderContent={serviceContent}
        initialSnap={1}
      />
    );
  },
);

export default BottomService;

const styles = StyleSheet.create({
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
  bottomContent: {
    width: '100%',
    height: 51,
  },
  bottomContentText: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 30,
  },
  bottomSheet: {
    backgroundColor: 'white',
    height: 400,
    width: '100%',
  },
});
