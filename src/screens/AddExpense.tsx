import { BorderRadiuses, Text, View, Colors } from 'react-native-ui-lib';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dimensions from '../constants/dimensions';

const AddExpense = () => {
  const navigation = useNavigation();
  return (
    <BlurView
      intensity={150}
      style={styles.root}
      onStartShouldSetResponder={() => {
        navigation.goBack();
        return true;
      }}
    >
      <View
        flexG
        padding-20
        style={styles.container}
        onStartShouldSetResponder={(e) => {
          e.stopPropagation();
          return false;
        }}
      >
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
    marginTop: Math.round(dimensions.height / 2.5),
    backgroundColor: Colors.rgba(Colors.white80, 0.9),
  },
});

export default AddExpense;
