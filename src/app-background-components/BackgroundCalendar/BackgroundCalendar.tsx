import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib/style';
import View from 'react-native-ui-lib/view';
import CustomizedCalendar from '../../components/CustomizedCalendar';
import useMount from '../../hooks/useMount';
import useBackgroundCalendar from './useBackgroundCalendar';

const ZINDEX = 1000;

const BackgroundCalendar = () => {
  const [isMounted, setIsMoundted] = useState(false);
  const { backgroundCalendarActive, setBackgroundCalendarActiveFalse } = useBackgroundCalendar();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: backgroundCalendarActive.value ? ZINDEX : -1,
    };
  });

  useMount(() => setIsMoundted(true));

  if (!isMounted) {
    return null;
  }

  return (
    <Animated.View style={[styles.rootView, animatedStyle]}>
      <Pressable style={StyleSheet.absoluteFillObject} onPress={setBackgroundCalendarActiveFalse} />
      <Animated.View style={styles.calendarView}>
        <CustomizedCalendar />
        <View />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backdrop,
  },
  calendarView: {
    width: '100%',
    maxWidth: 300,
  },
});

export default BackgroundCalendar;
