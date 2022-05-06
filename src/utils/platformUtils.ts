import { Platform } from 'react-native';

const platformUtils = {
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};

export default platformUtils;
