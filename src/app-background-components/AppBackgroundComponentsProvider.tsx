import { createContext, ReactNode, useCallback, useMemo } from 'react';
import { useSharedValue, SharedValue } from 'react-native-reanimated';

export type AppBackgroundComponentsContext = {
  backgroundCalendarActive: SharedValue<boolean> | null;
  setBackgroundCalendarActiveTrue: () => void;
  setBackgroundCalendarActiveFalse: () => void;
};

export type AppBackgroundComponentsProviderProps = {
  children?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {};

export const AppBackgroundComponentsContext = createContext<AppBackgroundComponentsContext>({
  backgroundCalendarActive: null,
  setBackgroundCalendarActiveFalse: voidFunction,
  setBackgroundCalendarActiveTrue: voidFunction,
});

const AppBackgroundComponentsProvider = ({ children }: AppBackgroundComponentsProviderProps) => {
  const backgroundCalendarActive = useSharedValue(false);

  const setBackgroundCalendarActiveTrue = useCallback(() => {
    backgroundCalendarActive.value = true;
  }, []);
  const setBackgroundCalendarActiveFalse = useCallback(() => {
    backgroundCalendarActive.value = false;
  }, []);

  const values = useMemo(() => {
    return {
      backgroundCalendarActive,
      setBackgroundCalendarActiveTrue,
      setBackgroundCalendarActiveFalse,
    };
  }, [backgroundCalendarActive, setBackgroundCalendarActiveFalse, setBackgroundCalendarActiveTrue]);

  return (
    <AppBackgroundComponentsContext.Provider value={values}>
      {children}
    </AppBackgroundComponentsContext.Provider>
  );
};

export default AppBackgroundComponentsProvider;
