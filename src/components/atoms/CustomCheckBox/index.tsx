import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  ImageURISource,
  ImageSourcePropType,
  PressableProps,
} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends PressableProps {
  checkSetBool: Dispatch<SetStateAction<boolean>>;
  checkBool: boolean;
  checkButtonImage: ImageSourcePropType & ImageURISource;
  uncheckButtonImage: ImageSourcePropType & ImageURISource;
}

const CustomCheckBox: FunctionComponent<Props> = function CustomCheckBox({
  checkSetBool,
  checkBool,
  checkButtonImage,
  uncheckButtonImage,
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(checkBool);
  }, [checkBool]);

  const onCheckBoxPress = () => {
    setIsChecked(!checkBool);
    checkSetBool(!checkBool);
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
