import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export default {
  ...dimensions,
  isSmall: dimensions.width < 375,
};
