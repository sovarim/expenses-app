import { BorderRadiuses, Button, Colors, Shadows, Text, View } from 'react-native-ui-lib';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import SafeAreaView from '../components/SafeAreaView';
import ExpenseCard, { ExpenseCardProps } from '../components/ExpenseCard';
import formatNumber from '../utils/formatNumber';

const DELAY_LONG_PRESS = 100;

const PlusIcon = () => {
  return <MaterialCommunityIcons name="plus" size={36} color={Colors.white} />;
};

const Main = () => {
  const navigation = useNavigation();
  const [selectections, setSelections] = useState<{ [key: number]: boolean }>({});

  const renderExpenseCard: ListRenderItem<ExpenseCardProps & { id: string }> = ({ item }) => {
    const { name, startDate, endDate, budget, spent, remain } = item;

    return (
      <ExpenseCard
        marginB-12
        // eslint-disable-next-line react/no-array-index-key
        name={name}
        startDate={startDate}
        endDate={endDate}
        activeOpacity={1}
        budget={budget}
        spent={spent}
        remain={remain}
      />
    );
  };

  return (
    <SafeAreaView flexG bg-primary>
      <View center style={styles.balanceView}>
        <View row center>
          <View
            br100
            center
            marginR-4
            width={25}
            height={25}
            backgroundColor={Colors.rgba(Colors.black, 0.4)}
          >
            <Text t1 white>
              ₽
            </Text>
          </View>
          <Text h1 white>
            {formatNumber(10000)}
          </Text>
        </View>
      </View>
      <View flex bg-screenBG style={styles.expensesView}>
        <View paddingH-20 marginB-8 marginT-8>
          <Text h3 textColor>
            Расходы
          </Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={renderExpenseCard}
          keyExtractor={(item) => item.id}
        />
        <View absB absR marginB-16 marginR-16>
          <Button
            padding-8
            iconSource={PlusIcon}
            onPress={() => navigation.navigate('AddExpense')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  balanceView: {
    height: 200,
    backgroundColor: Colors.primary,
  },
  expensesView: {
    borderTopLeftRadius: BorderRadiuses.br60,
    borderTopRightRadius: BorderRadiuses.br60,
    ...Shadows.sh30.top,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

const data = Array(6)
  .fill({
    name: 'September',
    startDate: '20/02/2022',
    endDate: '20/03/2022',
    budget: 20000,
    spent: 20000,
    remain: 20000,
  })
  .map((item) => ({ ...item, id: uuidv4() }));

export default Main;
