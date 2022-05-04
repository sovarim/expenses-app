import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { Button, Colors, Typography, TouchableOpacity } from 'react-native-ui-lib';
import { TextStyle, Touchable } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { memo, useCallback, useMemo } from 'react';
import MainScreen from '../screens/Main';
import AddExpenseScreen from '../screens/AddExpense';
import Settings from '../screens/Settings';
import { NavigatorParamList } from './types';
import { IconSizes } from '../styles/sizes';

const Stack = createNativeStackNavigator<NavigatorParamList>();

export type HeaderTitleStyle = Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'>;
export type Navigation = NavigationProp<ReactNavigation.RootParamList>;

const HeaderLeft = memo(({ navigation }: { navigation: Navigation }) => {
  return (
    <TouchableOpacity marginR-12 paddingH-4 onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={IconSizes.xs} color={Colors.white} />
    </TouchableOpacity>
  );
});

const Navigator = () => {
  const headerLeft = useCallback((navigation: Navigation) => {
    return () => {
      return <HeaderLeft navigation={navigation} />;
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: Colors.primary },
          contentStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { color: Colors.white, ...(Typography.h3 as HeaderTitleStyle) },
          headerBackTitleVisible: false,
          headerLeft: headerLeft(navigation as Navigation),
        })}
      >
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Настройки',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
