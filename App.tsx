import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { IntlProvider } from 'react-intl';
import Navigator from './src/navigation/Navigator';
import DefineDeviceColorScheme from './src/components/DefineDeviceColorScheme';
import store from './src/store';
import { fonts } from './src/styles/fonts';
import { BackgroundCalendar } from './src/app-background-components/BackgroundCalendar';
import AppBackgroundComponentsProvider from './src/app-background-components/AppBackgroundComponentsProvider';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <IntlProvider locale="ru">
        <AppBackgroundComponentsProvider>
          <GestureHandlerRootView style={styles.rootView}>
            <BackgroundCalendar />
            <View flexG bg-screenBG>
              <DefineDeviceColorScheme />
              <Navigator />
            </View>
          </GestureHandlerRootView>
        </AppBackgroundComponentsProvider>
      </IntlProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
