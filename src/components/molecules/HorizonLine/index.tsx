import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@src/constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  lineText?: string;
}

const HorizonLine: FunctionComponent<Props> = function HorizonLine({
  lineText,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.line} />
      <Text style={styles.text}>{lineText}</Text>
      <Text style={styles.line} />
    </View>
  );
};

export default HorizonLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '45%',
    textAlign: 'center',
    borderBottomColor: colors.GRAY_400,
    borderBottomWidth: 1,
    marginBottom: 30,
    height: 10,
    lineHeight: 15,
    overflow: 'hidden',
  },
  text: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#9E9E9E',
  },
});
