import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';
import Navigator from './src/navigation/Navigator';
import DefineDeviceColorScheme from './src/components/DefineDeviceColorScheme';
import store from './src/store';

import './src/styles';

export default function App() {
  return (
    <Provider store={store}>
      <View flexG bg-screenBG>
        <DefineDeviceColorScheme />
        <Navigator />
      </View>
    </Provider>
  );
}
