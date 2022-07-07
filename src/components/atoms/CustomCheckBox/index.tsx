import React, { FunctionComponent } from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  ImageURISource,
  ImageSourcePropType,
  PressableProps,
} from 'react-native';
import { TermsList } from '@src/data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends PressableProps {
  checkSetBool: (checked: string) => void;
  checkButtonImage: ImageSourcePropType & ImageURISource;
  uncheckButtonImage: ImageSourcePropType & ImageURISource;
  cluCd: string;
  isChecked?: boolean;
  // terms: TermsList;
}

const CustomCheckBox: FunctionComponent<Props> = function CustomCheckBox({
  checkSetBool,
  checkButtonImage,
  uncheckButtonImage,
  // terms,
  cluCd,
  isChecked,
}) {
  const onCheckBoxPress = () => {
    checkSetBool(cluCd);
  };
  return (
    <Pressable onPress={onCheckBoxPress}>
      <View style={styles.rowView}>
        {isChecked ? (
          <Image source={checkButtonImage} style={styles.checkBox} />
        ) : (
          <Image source={uncheckButtonImage} style={styles.checkBox} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 20,
    height: 20,
  },
  rowView: {
    flexDirection: 'row',
  },
});

export default CustomCheckBox;
