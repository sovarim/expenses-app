import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimesions = Dimensions.get('screen');

export default {
  screen: screenDimesions,
  window: windowDimensions,
};
