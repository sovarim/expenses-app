import { CalculatorKey } from '../components/CalculatorKeys';
import useMemoizedFn from './useMemoizedFn';

export type CalculatorHandler<T = CalculatorKey> = (key: T) => void;

export type UseCalculatorKeyTapHandler = (opts: {
  onKeyTap?: CalculatorHandler;
  onBackspace?: CalculatorHandler;
  onResult?: CalculatorHandler;
  onFunctionChange?: CalculatorHandler;
  onConfirm?: CalculatorHandler;
  onDate?: CalculatorHandler;
}) => CalculatorHandler;

const useCalculatorKeyTapHandler: UseCalculatorKeyTapHandler = ({
  onKeyTap,
  onBackspace,
  onResult,
  onFunctionChange,
  onConfirm,
  onDate,
}) => {
  const handler = useMemoizedFn<CalculatorHandler>((key) => {
    switch (key.code) {
      case 'backspace':
        onBackspace?.(key);
        break;
      case '=':
        onResult?.(key);
        break;
      case 'confirm':
        onConfirm?.(key);
        break;
      case 'date':
        onDate?.(key);
        break;
      default:
        if (['*', '/', '+', '-'].includes(key.code)) {
          onFunctionChange?.(key);
          return;
        }
        onKeyTap?.(key);
        break;
    }
  });

  return handler;
};

export default useCalculatorKeyTapHandler;
