import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import {
  View,
  TouchableOpacity,
  Text,
  ViewProps,
  Colors,
  BorderRadiuses,
} from 'react-native-ui-lib';
import { IconSizes } from '../styles/sizes';

const COLS_COUNT = 5;

const KEY_CODES = [
  '/',
  '1',
  '2',
  '3',
  'backspace',
  '*',
  '4',
  '5',
  '6',
  'date',
  '-',
  '7',
  '8',
  '9',
  'confirm',
  '+',
  '.',
  '0',
  '=',
] as const;

export type CalculatorKeyCode = typeof KEY_CODES[number];

export type CalculatorKey = typeof keys[number];

const keys: {
  code: CalculatorKeyCode;
  content: string | JSX.Element;
  cols?: number;
  style?: ViewProps['style'];
  textStyle?: StyleProp<TextStyle>;
}[] = [
  { code: '/', content: <MaterialCommunityIcons name="division" size={IconSizes.sm} /> },
  { code: '7', content: '7' },
  { code: '8', content: '8' },
  { code: '9', content: '9' },
  { code: 'backspace', content: <MaterialIcons name="backspace" size={IconSizes.sm} /> },
  { code: '*', content: <MaterialIcons name="close" size={IconSizes.sm} /> },
  { code: '4', content: '4' },
  { code: '5', content: '5' },
  { code: '6', content: '6' },
  { code: 'date', content: <MaterialIcons name="date-range" size={IconSizes.md} /> },
  { code: '-', content: <MaterialCommunityIcons name="minus" size={IconSizes.sm} /> },
  { code: '1', content: '1' },
  { code: '2', content: '2' },
  { code: '3', content: '3' },
  { code: '=', content: '=' },
  { code: '+', content: <MaterialCommunityIcons name="plus" size={IconSizes.sm} /> },
  { code: '.', content: ',' },
  { code: '0', content: '0' },
  {
    code: 'confirm',
    content: <MaterialIcons name="done" size={IconSizes.sm} />,
    cols: 2,
    style: {
      backgroundColor: Colors.green40,
    },
  },
];

const CalculatorKeys = ({ onPress }: { onPress: (code: CalculatorKey) => void }) => {
  return (
    <View style={styles.root}>
      {keys.map((key) => {
        const { code, content, cols = 1, style, textStyle } = key;
        const colWidth = 100 / COLS_COUNT;
        return (
          <TouchableOpacity
            key={code}
            style={[styles.item, { width: `${colWidth * cols}%` }]}
            onPress={() => onPress(key)}
          >
            <View style={[styles.itemView, style]}>
              <Text textColor text40H style={textStyle}>
                {content}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    fontSize: 100,
    alignItems: 'center',
    padding: 2,
  },
  itemView: {
    backgroundColor: Colors.orange50,
    paddingVertical: 20,
    width: '100%',
    borderRadius: BorderRadiuses.br30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(CalculatorKeys);
