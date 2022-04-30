import { Button, Colors, Text, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import SafeAreaView from '../components/SafeAreaView';
import ExpenseCard from '../components/ExpenseCard';

const PlusIcon = () => {
  return <MaterialCommunityIcons name="plus" size={36} color={Colors.white} />;
};

const Main = () => {
  const navigation = useNavigation();
  const [selectections, setSelections] = useState<{ [key: number]: boolean }>({});

  return (
    <SafeAreaView flexG>
      <ScrollView>
        <View flexG paddingH-12>
          <Text textColor text60 marginB-8 marginT-8>
            Расходы
          </Text>
          {Array(10)
            .fill(0)
            .map((_, i) => {
              return (
                <ExpenseCard
                  marginB-12
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  name="Сентябрь"
                  startDate="20/02/2022"
                  endDate="20/03/2022"
                  selected={selectections[i] ?? false}
                  activeOpacity={1}
                  budget={20000}
                  spent={100}
                  remain={19900}
                  onLongPress={() => setSelections((prev) => ({ ...prev, [i]: !prev[i] }))}
                />
              );
            })}
        </View>
      </ScrollView>
      <View absB absR marginB-16 marginR-16>
        <Button padding-8 iconSource={PlusIcon} onPress={() => navigation.navigate('AddExpense')} />
      </View>
    </SafeAreaView>
  );
};

export default Main;
