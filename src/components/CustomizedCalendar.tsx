import { memo, useMemo } from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { Colors } from 'react-native-ui-lib';
import useIsDark from '../hooks/useIsDark';
import { OpenSans } from '../styles/fonts';

export type CustomizedCalendarProps = Omit<CalendarProps, 'theme'> & { background?: 'transparent' };

const CustomizedCalendar = ({ background, ...props }: CustomizedCalendarProps) => {
  const isDark = useIsDark();
  const theme = useMemo<CalendarProps['theme']>(() => {
    return {
      calendarBackground: background || (isDark ? Colors.screenBG : Colors.white),
      textColor: Colors.grey40,
      dayTextColor: Colors.textColor,
      monthTextColor: Colors.$backgroundPrimaryHeavy,
      arrowColor: Colors.$backgroundPrimaryHeavy,
      todayTextColor: Colors.$backgroundPrimaryHeavy,
      textDayFontFamily: OpenSans.w400,
      textMonthFontFamily: OpenSans.w500,
      textDayHeaderFontFamily: OpenSans.w500,
      selectedDayTextColor: Colors.white,
      selectedDayBackgroundColor: Colors.primary,
      textDisabledColor: isDark ? Colors.grey30 : Colors.grey50,
    };
  }, [isDark]);
  return <Calendar theme={theme} {...props} />;
};

export default memo(CustomizedCalendar);
