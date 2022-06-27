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
  isGender: Dispatch<SetStateAction<string>>;
}

export interface BottomGenderRef {
  open: () => void;
  close: () => void;
}

const BottomGender = forwardRef<BottomGenderRef, Props>(({ isGender }, ref) => {
  const genderRef = React.useRef<BottomSheet>(null);
  const [gender, setGender] = React.useState<string>('');

  useImperativeHandle(
    ref,
    () => ({
      open: () => genderRef.current?.snapTo(0),
      close: () => genderRef.current?.snapTo(1),
    }),
    [],
  );

  const genderContent = () => (
    <View style={styles.bottomSheet}>
      <View style={styles.bottomHeader}>
        <Text style={styles.bottomHeaderText}>성별을 선택해주세요.</Text>
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
          setGender('남성');
          isGender('남성');
          genderRef.current?.snapTo(1);
        }}
      >
        <Text style={styles.bottomContentText}>남성</Text>
        {gender === '남성' ? (
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
          setGender('여성');
          isGender('여성');
          genderRef.current?.snapTo(1);
        }}
      >
        <Text style={styles.bottomContentText}>여성</Text>
        {gender === '여성' ? (
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
      snapPoints={[200, 0]}
      borderRadius={8}
      renderContent={genderContent}
      initialSnap={1}
    />
  );
});

export default BottomGender;

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
    height: 200,
    width: '100%',
  },
});
