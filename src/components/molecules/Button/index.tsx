import React, { FunctionComponent } from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends PressableProps {
  label?: string | undefined;
  buttonColor?: string;
  height?: string;
  textColor?: string;
  textSize?: number;
  textWeight?: number;
  borderColor?: string;
  borderWidth?: number;
  marginBottom?: number;
}

const Button: FunctionComponent<Props> = function Button({
  label,
  buttonColor,
  height,
  textColor,
  textSize,
  textWeight,
  borderColor,
  borderWidth = 0,
  marginBottom = 0,
  ...res
}) {
  return (
    <StyledButton
      buttonColor={buttonColor}
      height={height}
      borderColor={borderColor}
      borderWidth={borderWidth}
      marginBottom={marginBottom}
      {...res}
    >
      <StyledText
        textColor={textColor}
        textSize={textSize}
        textWeight={textWeight}
      >
        {label}
      </StyledText>
    </StyledButton>
  );
};

export default Button;

interface StyledButtonProps {
  height: string | undefined;
  buttonColor: string | undefined;
  borderColor: string | undefined;
  borderWidth: number;
  marginBottom: number;
}

interface StyleTextProps {
  textColor: string | undefined;
  textSize: number | undefined;
  textWeight: number | undefined;
}

const StyledButton = styled(Pressable)<StyledButtonProps>`
  background-color: ${props => props.buttonColor};
  height: ${props => props.height};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-color: ${props => props.borderColor};
  border-width: ${props => props.borderWidth}px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const StyledText = styled.Text<StyleTextProps>`
  color: ${props => props.textColor};
  font-size: ${props => props.textSize}px;
  font-weight: ${props => props.textWeight};
`;
