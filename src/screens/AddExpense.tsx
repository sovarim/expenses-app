import { BorderRadiuses, Text, View, Colors } from 'react-native-ui-lib';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import dimensions from '../constants/dimensions';

const AddExpense = () => {
  return (
    <BlurView intensity={200} style={styles.root}>
      <View flexG padding-20 style={styles.container}>
        <Text>Add expense</Text>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  container: {
    borderTopLeftRadius: BorderRadiuses.br60,
    borderTopRightRadius: BorderRadiuses.br60,
    backgroundColor: Colors.rgba(Colors.white80, 0.9),
    marginTop: Math.round(dimensions.height / 2.5),
  },
});

export default AddExpense;
