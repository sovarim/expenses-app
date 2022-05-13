import { useContext } from 'react';
import { AppBackgroundComponentsContext } from '../AppBackgroundComponentsProvider';

const useBackgroundCalendar = () => {
  const {
    backgroundCalendarActive,
    setBackgroundCalendarActiveFalse,
    setBackgroundCalendarActiveTrue,
  } = useContext(AppBackgroundComponentsContext);
  return {
    backgroundCalendarActive,
    setBackgroundCalendarActiveFalse,
    setBackgroundCalendarActiveTrue,
  };
};

export default useBackgroundCalendar;
