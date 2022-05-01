import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './src/navigation/Navigator';
import DefineDeviceColorScheme from './src/components/DefineDeviceColorScheme';
import store from './src/store';
import { fonts } from './src/styles/fonts';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <View flexG bg-screenBG>
        <DefineDeviceColorScheme />
        <Navigator />
      </View>
    </Provider>
  );
}
