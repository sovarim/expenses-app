import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigatorParamList = {
  Main: undefined;
  AddExpense: undefined;
};

export type NavigatorProps = NativeStackNavigationProp<NavigatorParamList>;
