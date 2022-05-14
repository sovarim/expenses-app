import { memo, useCallback, useEffect, useState } from 'react';
import { Colors, Typography } from 'react-native-ui-lib/style';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { FormattedNumber } from 'react-intl';
import { StyleSheet, Modal, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { OpenSans } from '../../styles/fonts';
import CalculatorKeys, { CalculatorKey } from '../CalculatorKeys';
import useCalculatorKeyTapHandler, {
  CalculatorHandler,
} from '../../hooks/useCalculatorKeyTapHandler';
import calculate, { CalculateFunctionType } from '../../utils/calculate';
import isLastDot from '../../utils/isLastDot';
import limitSymbolsAfterDot from '../../utils/limitSymbolsAfterDot';
import removeLastSymbol from '../../utils/removeLastSymbol';
import ExpensesModalInput from './ExpensesModalInput';
import { useBackgroundCalendar } from '../../app-background-components/BackgroundCalendar';

export type ExpenseCalculatorProps = {
  onConfirm: CalculatorHandler<number>;
  onChange?: CalculatorHandler<string>;
  onNameChange?: CalculatorHandler<string>;
  nameValue: string;
};

const MAXIMUM_FRACTION_DIGITS = 2;

const includesDot = (str: string) => str.includes('.');
const addSymbol = (value: string) => (prev: string) =>
  limitSymbolsAfterDot(`${prev}${value}`, MAXIMUM_FRACTION_DIGITS);

const removeSymbol = (prev: string) => removeLastSymbol(prev);

const ExpenseCalculator = ({
  onConfirm,
  onChange,
  nameValue,
  onNameChange,
}: ExpenseCalculatorProps) => {
  const [sumLeftValue, setSumLeftValue] = useState('0');
  const [sumRightValue, setSumRightValue] = useState('');
  const [currentFuctionKey, setCurrentFuctionKey] = useState<CalculatorKey | null>(null);
  const [nameDialogVisible, setNameDialogVisible] = useState(false);

  const {
    setBackgroundCalendarActiveTrue,
    backgroundCalendarActive,
    setBackgroundCalendarActiveFalse,
  } = useBackgroundCalendar();

  const calclatorKeyTapHandler = useCalculatorKeyTapHandler({
    onCommaTap: (key) => {
      if (currentFuctionKey) {
        if (includesDot(sumRightValue)) return;
        setSumRightValue(addSymbol(key.code));
      } else {
        if (includesDot(sumLeftValue)) return;
        setSumLeftValue(addSymbol(key.code));
      }
    },
    onKeyTap: (key) => {
      if (currentFuctionKey) {
        setSumRightValue(addSymbol(key.code));
      } else {
        setSumLeftValue(addSymbol(key.code));
      }
    },
    onBackspace: () => {
      if (Number(sumRightValue)) {
        setSumRightValue(removeSymbol || '0');
        return;
      }
      if (currentFuctionKey) {
        setCurrentFuctionKey(null);
        return;
      }
      setSumLeftValue(removeSymbol || '0');
    },
    onFunctionChange: (key) => {
      setCurrentFuctionKey(key);
    },
    onDate: () => {
      setBackgroundCalendarActiveTrue();
    },
    onResult: () => {
      if (currentFuctionKey) {
        setSumLeftValue(
          calculate(
            Number(sumLeftValue),
            Number(sumRightValue),
            currentFuctionKey.code as CalculateFunctionType,
          ).toString(),
        );
        setCurrentFuctionKey(null);
        setSumRightValue('');
      }
    },
    onConfirm: () => onConfirm(Number(sumLeftValue)),
  });

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (backgroundCalendarActive.value) {
          setBackgroundCalendarActiveFalse();
          return true;
        }
        return false;
      });
      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    onChange?.(sumRightValue);
  }, [sumRightValue]);

  const showNameDialog = useCallback(() => {
    setNameDialogVisible(true);
  }, []);

  const closeNameDialog = useCallback(() => {
    setNameDialogVisible(false);
  }, []);

  const onModalInputConfirm = useCallback((value: string) => {
    closeNameDialog();
    onNameChange?.(value);
  }, []);

  return (
    <View flexG>
      <View center height={70} bg-primary>
        <View row center>
          <Text
            style={{
              fontSize: Typography.text40?.fontSize,
              fontFamily: OpenSans.w600,
              color: Colors.white,
            }}
          >
            <FormattedNumber
              value={Number(sumLeftValue)}
              minimumFractionDigits={0}
              maximumFractionDigits={MAXIMUM_FRACTION_DIGITS}
            />
            {isLastDot(sumLeftValue) && ','}
          </Text>
          {currentFuctionKey && (
            <>
              <Text white marginH-2 marginT-2>
                {currentFuctionKey.content}
              </Text>
              {Boolean(sumRightValue) && (
                <Text
                  style={{
                    fontSize: Typography.text40?.fontSize,
                    fontFamily: OpenSans.w600,
                    color: Colors.white,
                  }}
                >
                  <FormattedNumber
                    value={Number(sumRightValue)}
                    minimumFractionDigits={0}
                    maximumFractionDigits={MAXIMUM_FRACTION_DIGITS}
                  />
                  {isLastDot(sumRightValue) && ','}
                </Text>
              )}
            </>
          )}
          <Text text60H white marginL-s1 marginT-s2>
            ₽
          </Text>
        </View>
      </View>
      <View flex padding-s1>
        <View paddingH-s2 paddingB-s2>
          <Text t1I textColor grey30 center onPress={showNameDialog} style={styles.nameText}>
            {nameValue || 'Название'}
          </Text>
        </View>
        <CalculatorKeys onPress={calclatorKeyTapHandler} />
        <Modal
          transparent
          animationType="fade"
          visible={nameDialogVisible}
          onRequestClose={closeNameDialog}
        >
          <ExpensesModalInput initialValue={nameValue} onConfirm={onModalInputConfirm} />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    borderBottomColor: Colors.grey40,
    borderBottomWidth: 1,
  },
});

export default memo(ExpenseCalculator);
