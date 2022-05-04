import { useCallback } from 'react';
import { RadioButton, RadioGroup, Text, View } from 'react-native-ui-lib';
import { useAppDispatch, useAppSelector } from '../store';
import {
  ColorSchemeState,
  selectColorScheme,
  setColorScheme,
} from '../store/colorScheme/colorSchemeSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector(selectColorScheme);
  const onValueChange = useCallback((value: ColorSchemeState) => {
    dispatch(setColorScheme(value));
  }, []);

  return (
    <View flexG bg-screenBG padding-10>
      <Text h4 marginB-8 textColor>
        Тема
      </Text>
      <RadioGroup initialValue={colorScheme} onValueChange={onValueChange}>
        <View marginB-8>
          <RadioButton value="light" label="Светлая" />
        </View>
        <View marginB-8>
          <RadioButton value="dark" label="Темная" />
        </View>
        <View marginB-8>
          <RadioButton value="default" label="Как в системе" />
        </View>
      </RadioGroup>
    </View>
  );
};

export default Settings;
