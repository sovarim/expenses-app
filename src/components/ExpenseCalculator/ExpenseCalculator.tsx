import { memo, useCallback, useEffect, useState } from 'react';
import {
  Colors,
  Text,
  Typography,
  View,
  Button,
  BorderRadiuses,
  Dialog,
} from 'react-native-ui-lib';
import { FormattedNumber } from 'react-intl';
import { StyleSheet, Modal } from 'react-native';
import XDate from 'xdate';
import { MarkingTypes } from 'react-native-calendars/src/types';
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
import CustomizedCalendar from '../CustomizedCalendar';
import useIsDark from '../../hooks/useIsDark';

export type ExpenseCalculatorProps = {
  onConfirm: CalculatorHandler<number>;
  calendarMarkingType?: MarkingTypes;
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
  calendarMarkingType = 'dot',
  onChange,
  nameValue,
  onNameChange,
}: ExpenseCalculatorProps) => {
  const isDark = useIsDark();
  const [sumLeftValue, setSumLeftValue] = useState('0');
  const [sumRightValue, setSumRightValue] = useState('');
  const [currentFuctionKey, setCurrentFuctionKey] = useState<CalculatorKey | null>(null);
  const [nameDialogVisible, setNameDialogVisible] = useState(false);
  const [calendarDialogVisible, setCalendarDialogVisible] = useState(false);

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
      showCalendarDialog();
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

  const showCalendarDialog = useCallback(() => {
    setCalendarDialogVisible(true);
  }, []);

  const closeCalendarDialog = useCallback(() => {
    setCalendarDialogVisible(false);
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
      <Dialog
        overlayBackgroundColor={Colors.rgba(Colors.black, 0.6)}
        visible={calendarDialogVisible}
        onDismiss={closeCalendarDialog}
        containerStyle={{
          borderRadius: BorderRadiuses.br40,
        }}
      >
        <View style={{ backgroundColor: isDark ? Colors.screenBG : Colors.white }} padding-s1>
          <CustomizedCalendar
            background="transparent"
            firstDay={1}
            maxDate={new XDate('2022-05-28').toString('yyyy-MM-dd')}
            markingType={calendarMarkingType}
            markedDates={{
              '2022-05-04': {
                startingDay: true,
                color: Colors.primary,
                textColor: Colors.white,
              },
              ...Object.fromEntries(
                Array(13)
                  .fill(0)
                  .map((_, i) => {
                    const sum = 5 + i;
                    const day = sum <= 9 ? `0${sum}` : sum;
                    return [
                      `2022-05-${day}`,
                      { color: Colors.getColorTint(Colors.primary, 40), textColor: Colors.white },
                    ];
                  }),
              ),
              '2022-05-18': {
                endingDay: true,
                color: Colors.primary,
                textColor: Colors.white,
              },
            }}
          />
          <View row right paddingV-s2 paddingH-s4>
            <Button
              link
              labelStyle={Typography.t1B}
              onPress={closeCalendarDialog}
              color={Colors.$textDanger}
              label="Отмена"
            />
            <Button marginL-s4 labelStyle={Typography.t1B} link label="Ок" />
          </View>
        </View>
      </Dialog>
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
