import { memo, useState } from 'react';
import { Colors, Text, Typography, View } from 'react-native-ui-lib';
import { FormattedNumber } from 'react-intl';
import { OpenSans } from '../styles/fonts';
import CalculatorKeys, { CalculatorKey } from './CalculatorKeys';
import useCalculatorKeyTapHandler, { CalculatorHandler } from '../hooks/useCalculatorKeyTapHandler';
import calculate, { CalculateFunctionType } from '../utils/calculate';

// export type AddExpenseFormProps = {};

const MAXIMUM_FRACTION_DIGITS = 2;

const isLastDot = (str: string) => str.charAt(str.length - 1) === '.';
const limitFractionDigits = (str: string) => {
  const splitted = str.split('.');
  if (splitted[1]) {
    splitted[1] = splitted[1].slice(0, MAXIMUM_FRACTION_DIGITS + 1);
  }
  return splitted.join('.');
};

const ExpenseCalculator = ({ onConfirm }: { onConfirm: CalculatorHandler<number> }) => {
  const [sumLeftValue, setSumLeftValue] = useState('0');
  const [sumRightValue, setSumRightValue] = useState('');
  const [currentFuctionKey, setCurrentFuctionKey] = useState<CalculatorKey | null>(null);

  const calclatorKeyTapHandler = useCalculatorKeyTapHandler({
    onKeyTap: (key) => {
      if (currentFuctionKey) {
        if (key.code === '.' && (sumRightValue.includes('.') || !sumRightValue.length)) {
          return;
        }

        setSumRightValue((prev) => limitFractionDigits(`${prev}${key.code}`));
        return;
      }

      if (key.code === '.' && (sumLeftValue.includes('.') || !sumLeftValue.length)) {
        return;
      }

      setSumLeftValue((prev) => limitFractionDigits(`${prev}${key.code}`));
    },
    onBackspace: () => {
      if (Number(sumRightValue)) {
        setSumRightValue((prev) => prev.slice(0, prev.length - 1) || '0');
        return;
      }

      if (currentFuctionKey) {
        setCurrentFuctionKey(null);
        return;
      }

      setSumLeftValue((prev) => prev.slice(0, prev.length - 1) || '0');
    },
    onFunctionChange: (key) => {
      setCurrentFuctionKey(key);
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

  return (
    <View flex>
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
          <Text text60H white marginL-2 marginT-8>
            ₽
          </Text>
        </View>
      </View>
      <View flex padding-4>
        <CalculatorKeys onPress={calclatorKeyTapHandler} />
      </View>
    </View>
  );
};

export default memo(ExpenseCalculator);
