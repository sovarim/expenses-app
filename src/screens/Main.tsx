import { BorderRadiuses, Button, Colors, Shadows, Text, View } from 'react-native-ui-lib';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { ListRenderItem, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRef, useState } from 'react';
import SafeAreaView from '../components/SafeAreaView';
import ExpenseCard, { ExpenseCardProps } from '../components/ExpenseCard';
import formatNumber from '../utils/formatNumber';
import dimensions from '../constants/dimensions';

const BALANCE_VIEW_DEFAULT_HEIGHT = 200;
const BALANCE_VIEW_MIN_HEIGHT = 100;

const PlusIcon = () => {
  return <MaterialCommunityIcons name="plus" size={36} color={Colors.white} />;
};

const Main = () => {
  const navigation = useNavigation();
  const balanceViewHeight = useSharedValue(BALANCE_VIEW_DEFAULT_HEIGHT);
  const faltScroll = useSharedValue(0);
  const listRef = useAnimatedRef<Animated.FlatList>();

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx: { startY: number }) => {
      ctx.startY = e.y;
    },
    onActive: (e, ctx: { startY: number }) => {
      const diffrence = ctx.startY - e.y;
      const newHeight = balanceViewHeight.value - diffrence;
      balanceViewHeight.value = interpolate(
        newHeight,
        [BALANCE_VIEW_MIN_HEIGHT, BALANCE_VIEW_DEFAULT_HEIGHT],
        [BALANCE_VIEW_MIN_HEIGHT, BALANCE_VIEW_DEFAULT_HEIGHT],
        { extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP },
      );
    },
  });

  const balanceViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: balanceViewHeight.value,
    };
  });

  const renderExpenseCard: ListRenderItem<ExpenseCardProps & { id: string }> = ({ item }) => {
    const { name, startDate, endDate, budget, spent, remain } = item;
    return (
      <ExpenseCard
        marginB-12
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
    <SafeAreaView reanimated flexG bg-primary>
      <View reanimated center style={balanceViewAnimatedStyle}>
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
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <View reanimated flex bg-screenBG style={styles.expensesView}>
          <View paddingH-20 marginB-8 marginT-8>
            <Text h3 textColor>
              Расходы
            </Text>
          </View>
          <Animated.FlatList
            ref={listRef}
            style={styles.flatList}
            data={data}
            renderItem={renderExpenseCard}
            keyExtractor={(item) => item.id}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
          <View absB absR marginB-16 marginR-16>
            <Button
              padding-8
              iconSource={PlusIcon}
              onPress={() => navigation.navigate('AddExpense')}
            />
          </View>
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  expensesView: {
    borderTopLeftRadius: BorderRadiuses.br60,
    borderTopRightRadius: BorderRadiuses.br60,
    ...Shadows.sh30.top,
  },
  flatList: {
    height:
      dimensions.height -
      (initialWindowMetrics?.insets.bottom || 0) -
      (initialWindowMetrics?.insets.top || 0) +
      BALANCE_VIEW_DEFAULT_HEIGHT,
    paddingHorizontal: 10,
  },
});

const data = Array(10)
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
