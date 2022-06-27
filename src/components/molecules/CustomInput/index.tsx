import React, { FunctionComponent, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';
import styled from 'styled-components/native';
import { icons } from '@src/assets';
import { colors } from '@src/constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends TextInputProps {
  label?: string;
  borderColor?: string;
  height?: number;
  idFocus?: boolean;
  marginBottom?: number;
  isPassword?: boolean;
}

const CustomInput: FunctionComponent<Props> = function CustomInput({
  label,
  borderColor = '',
  height = 0,
  idFocus = false,
  marginBottom = 0,
  isPassword = false,
  ...res
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onVisiblePress = () => {
    setIsVisible(!isVisible);
  };
  const onVisibled = () => {
    return isVisible ? (
      <Image source={icons.STATE_OFF} style={styles.visibleButton} />
    ) : (
      <Image source={icons.STATE_ON} style={styles.visibleButton} />
    );
  };
  return (
    <SafeAreaView>
      <Text style={styles.labelStyle}>{label}</Text>
      <StyledTextInput
        borderColor={borderColor}
        height={height}
        idFocus={idFocus}
        {...res}
        marginBottom={marginBottom}
        secureTextEntry={isVisible}
      />
      {isPassword ? (
        <Pressable onPress={onVisiblePress} style={styles.visibleBox}>
          {onVisibled}
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};

export default CustomInput;

interface StyledTextInputProps {
  borderColor: string;
  height: number;
  idFocus: boolean;
  marginBottom: number;
}
const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  // widht: 100%;
  border: 1px solid
    ${props => (props.idFocus ? props.borderColor : colors.GRAY_400)};
  height: ${props => props.height}px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  padding: 16px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const styles = StyleSheet.create({
  labelStyle: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  visibleBox: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  visibleButton: {
    width: 20,
    height: 20,
  },
});
