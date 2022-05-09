import { Typography } from 'react-native-ui-lib';
import { FontSource } from 'expo-font';
import typography from 'react-native-ui-lib/src/style/typography';

export enum OpenSans {
  w400 = 'OpenSans-Regular',
  w400I = 'OpenSans-Italic',
  w500 = 'OpenSans-Medium',
  w600 = 'OpenSans-SemiBold',
  w700 = 'OpenSans-Bold',
  w800 = 'OpenSans-ExtraBold',
}

export const fonts: { [key in OpenSans]: FontSource } = {
  [OpenSans.w400]: require('../../assets/fonts/OpenSans-Regular.ttf'),
  [OpenSans.w400I]: require('../../assets/fonts/OpenSans-Italic.ttf'),
  [OpenSans.w500]: require('../../assets/fonts/OpenSans-Medium.ttf'),
  [OpenSans.w600]: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
  [OpenSans.w700]: require('../../assets/fonts/OpenSans-Bold.ttf'),
  [OpenSans.w800]: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
};

Typography.loadTypographies({
  h1: {
    fontSize: Typography.text30?.fontSize,
    lineHeight: Typography.text30?.lineHeight,
    fontFamily: OpenSans.w700,
  },
  h2: {
    fontSize: Typography.text50?.fontSize,
    lineHeight: Typography.text50?.lineHeight,
    fontFamily: OpenSans.w700,
  },
  h3: {
    fontSize: Typography.text60?.fontSize,
    lineHeight: Typography.text60?.lineHeight,
    fontFamily: OpenSans.w700,
  },
  h4: {
    fontSize: Typography.text70?.fontSize,
    lineHeight: Typography.text70?.lineHeight,
    fontFamily: OpenSans.w600,
  },
  t1: {
    fontSize: Typography.text70?.fontSize,
    lineHeight: Typography.text70?.lineHeight,
    fontFamily: OpenSans.w400,
  },
  t1I: {
    fontSize: Typography.text70?.fontSize,
    lineHeight: Typography.text70?.lineHeight,
    fontFamily: OpenSans.w400I,
  },
  t1B: {
    fontSize: Typography.text70?.fontSize,
    lineHeight: Typography.text70?.lineHeight,
    fontFamily: OpenSans.w600,
  },
  t2: {
    fontSize: Typography.text80?.fontSize,
    lineHeight: Typography.text80?.lineHeight,
    fontFamily: OpenSans.w400,
  },
  t3: {
    fontSize: Typography.text90?.fontSize,
    lineHeight: Typography.text90?.lineHeight,
    fontFamily: OpenSans.w600,
  },
  t4: {
    fontSize: Typography.text100?.fontSize,
    lineHeight: Typography.text100?.lineHeight,
    fontFamily: OpenSans.w600,
  },
  ...Object.fromEntries(
    Object.entries(Typography).map(([key, t]) => [key, { ...t, fontFamily: OpenSans.w500 }]),
  ),
});
