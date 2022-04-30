import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { Colors } from 'react-native-ui-lib';
import { StatusBar } from 'expo-status-bar';
import { selectColorScheme } from '../store/colorScheme/colorSchemeSlice';
import { useAppSelector } from '../store';

const getOppositeScheme = (scheme: 'light' | 'dark') => {
  switch (scheme) {
    case 'dark':
      return 'light';
    case 'light':
      return 'dark';
    default:
      return 'light';
  }
};

const DefineDeviceColorScheme = () => {
  const colorScheme = useAppSelector(selectColorScheme);
  const isDefault = colorScheme === 'default';
  const deviceScheme = useColorScheme();
  useEffect(() => {
    if (!isDefault) {
      Colors.setScheme(colorScheme);
      return;
    }
    Colors.setScheme(deviceScheme || 'dark');
  }, [deviceScheme, colorScheme]);
  return <StatusBar style={isDefault ? 'auto' : getOppositeScheme(colorScheme)} />;
};

export default DefineDeviceColorScheme;
