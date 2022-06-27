import React, { FunctionComponent } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  Pressable,
  PressableProps,
} from 'react-native';
import styled from 'styled-components/native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends PressableProps {
  checkImage: ImageSourcePropType & ImageURISource;
  checkWidth: number;
  checkHeight: number;
  position?: boolean;
  Top?: number | undefined;
  Right?: number | undefined;
  // Bottom?: number | undefined;
  // Left?: number | undefined;
}
const CustomCheckBoxRe: FunctionComponent<Props> = function CustomCheckBoxRe({
  checkImage,
  checkWidth = 0,
  checkHeight = 0,
  position = false,
  Top = 0,
  Right = 0,
  // Bottom = 0,
  // Left = 0,
  ...res
}) {
  return (
    <CheckBoxButton
      position={position}
      Top={Top}
      // Bottom={Bottom}
      // Left={Left}
      Right={Right}
      {...res}
    >
      <CheckBoxImage
        source={checkImage}
        checkWidth={checkWidth}
        checkHeight={checkHeight}
      />
    </CheckBoxButton>
  );
};

export default CustomCheckBoxRe;

interface StyledImage {
  checkWidth: number;
  checkHeight: number;
}

interface StylePressable {
  position: boolean;
  Top?: number;
  Bottom?: number;
  Left?: number;
  Right?: number;
}

const CheckBoxButton = styled(Pressable)<StylePressable>`
  position: ${props => (props.position ? 'absolute' : 'relative')};
  top: ${props => props.Top};
  // bottom: ${props => props.Bottom};
  // left: ${props => props.Left};
  right: ${props => props.Right};
`;

const CheckBoxImage = styled(Image)<StyledImage>`
  width: ${props => props.checkWidth}px;
  height: ${props => props.checkHeight}px;
`;
