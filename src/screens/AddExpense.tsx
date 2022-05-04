import { BorderRadiuses, View } from 'react-native-ui-lib';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dimensions from '../constants/dimensions';
import useIsDark from '../hooks/useIsDark';
import ExpenseCalculator from '../components/ExpenseCalculator';

const AddExpense = () => {
  const navigation = useNavigation();

  const isDark = useIsDark();

  return (
    <BlurView
      intensity={100}
      style={styles.root}
      tint={isDark ? 'dark' : 'light'}
      onStartShouldSetResponder={() => {
        navigation.goBack();
        return true;
      }}
    >
      <View
        flexG
        bg-screenBG
        style={styles.container}
        onStartShouldSetResponder={(e) => {
          e.stopPropagation();
          return false;
        }}
      >
        <ExpenseCalculator
          onConfirm={(value) => {
            console.log(value);
          }}
        />
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
    overflow: 'hidden',
  },
});

export default AddExpense;
