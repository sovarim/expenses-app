import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import View from 'react-native-ui-lib/view';
import Button from 'react-native-ui-lib/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { BorderRadiuses, Typography, Colors } from 'react-native-ui-lib/style';
import Backdrop from '../Backdrop';
import { IconSizes } from '../../styles/sizes';

const ExpensesModalInput = ({
  onConfirm,
  initialValue,
}: {
  onConfirm: (value: string) => void;
  initialValue: string;
}) => {
  const input = useRef<TextInput>(null);
  const [value, setValue] = useState(initialValue);

  const onChangeText = useCallback((_value: string) => {
    setValue(_value);
  }, []);

  useEffect(() => {
    const inputFocus = () => input.current?.focus();
    setTimeout(inputFocus, 100);
  }, [input.current]);
  return (
    <Backdrop flex center paddingH-20>
      <View width="100%" bg-screenBG br30 paddingH-20 paddingV-10>
        <TextInput
          ref={input}
          placeholder="Название"
          defaultValue={value}
          style={styles.nameField}
          onChangeText={onChangeText}
        />
        <View row right marginT-8>
          <Button
            bg-green30
            borderRadius={BorderRadiuses.br20}
            size={Button.sizes.xSmall}
            onPress={() => onConfirm(value)}
          >
            <MaterialIcons name="done" color="white" size={IconSizes.xs} />
          </Button>
        </View>
      </View>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  nameField: {
    ...Typography.t1I,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40,
    width: '100%',
    paddingVertical: 0,
    marginBottom: 4,
  },
});

export default ExpensesModalInput;
