import { registerRootComponent } from 'expo';
import './src/styles';
import 'react-native-get-random-values';
import 'intl';
import 'intl/locale-data/jsonp/ru';

import App from './App';

registerRootComponent(App);
