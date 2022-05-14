import { BorderRadiuses, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { useState } from 'react';
import dimensions from '../constants/dimensions';
import Backdrop from '../components/Backdrop';
import { ExpenseCalculator } from '../components/ExpenseCalculator';

const AddExpense = () => {
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');

  return (
    <Backdrop style={styles.root}>
      <View bottom bg-screenBG style={styles.container}>
        <ExpenseCalculator
          onConfirm={(value) => {
            console.log(value);
          }}
          onChange={setBudget}
          nameValue={name}
          onNameChange={setName}
        />
      </View>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: initialWindowMetrics?.frame.height || dimensions.screen.height,
  },
  container: {
    borderTopLeftRadius: BorderRadiuses.br60,
    borderTopRightRadius: BorderRadiuses.br60,
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
    paddingBottom: 10,
  },
});

export default AddExpense;
