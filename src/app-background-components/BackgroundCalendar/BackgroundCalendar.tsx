import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib';
import CustomizedCalendar from '../../components/CustomizedCalendar';
import useBackgroundCalendar from './useBackgroundCalendar';

const ZINDEX = 1000;

const BackgroundCalendar = () => {
  const { backgroundCalendarActive, setBackgroundCalendarActiveFalse } = useBackgroundCalendar();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: backgroundCalendarActive?.value ? ZINDEX : -1,
    };
  });

  const animtedCalendarView = useAnimatedStyle(() => {
    return {
      transform: [{ scale: backgroundCalendarActive?.value ? withSpring(1) : withSpring(0) }],
    };
  });

  return (
    <Animated.View style={[styles.rootView, animatedStyle]}>
      <Pressable style={StyleSheet.absoluteFillObject} onPress={setBackgroundCalendarActiveFalse} />
      <Animated.View style={animtedCalendarView}>
        <CustomizedCalendar />
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
});

export default BackgroundCalendar;
