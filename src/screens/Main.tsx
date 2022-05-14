import {
  BorderRadiuses,
  Button,
  Colors,
  Shadows,
  Text,
  View,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ListRenderItem, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { FormattedNumber } from 'react-intl';
import SafeAreaView from '../components/SafeAreaView';
import ExpenseCard, { ExpenseCardProps } from '../components/ExpenseCard';
import dimensions from '../constants/dimensions';
import { IconSizes } from '../styles/sizes';

const BALANCE_VIEW_DEFAULT_HEIGHT = 200;
const BALANCE_VIEW_MIN_HEIGHT = 70;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PlusIcon = () => {
  return <MaterialCommunityIcons name="plus" size={IconSizes.xl} color={Colors.white} />;
};

const Main = () => {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);
  const showAddButton = useSharedValue(true);

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (e, ctx: { prevScrollY: number }) => {
      ctx.prevScrollY = e.contentOffset.y;
    },
    onScroll: (e, ctx: { prevScrollY: number }) => {
      scrollY.value = e.contentOffset.y;
      showAddButton.value = ctx.prevScrollY > e.contentOffset.y;
      ctx.prevScrollY = e.contentOffset.y;
    },
  });

  const balanceViewAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, BALANCE_VIEW_DEFAULT_HEIGHT],
      [BALANCE_VIEW_DEFAULT_HEIGHT, BALANCE_VIEW_MIN_HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      height: withSpring(height),
    };
  });

  const balanceTitleViewAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, BALANCE_VIEW_DEFAULT_HEIGHT - 50],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity: withTiming(opacity),
      height: opacity ? withTiming(14) : withTiming(0),
    };
  });

  const addButtonViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: showAddButton.value ? withTiming(0) : withTiming(250) }],
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
    <SafeAreaView absF bg-primary>
      <View absR absT style={styles.settingsButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" color={Colors.white80} size={IconSizes.md} />
        </TouchableOpacity>
      </View>
      <View reanimated center style={balanceViewAnimatedStyle}>
        <View reanimated style={balanceTitleViewAnimatedStyle}>
          <Text grey40 t4 uppercase>
            Текущий баланс
          </Text>
        </View>
        <View row center>
          <TouchableOpacity br100 center marginR-4 style={styles.currencyButton}>
            <Text t1 white>
              ₽
            </Text>
          </TouchableOpacity>
          <Text h1 white>
            <FormattedNumber value={17264} />
          </Text>
        </View>
      </View>
      <View flex bg-screenBG style={styles.expensesView}>
        <View paddingH-20 marginV-12>
          <Text h3 textColor>
            Расходы
          </Text>
        </View>
        <AnimatedFlatList
          style={styles.flatList}
          data={data}
          renderItem={renderExpenseCard}
          keyExtractor={(item: typeof data[number]) => item.id}
          onScroll={scrollHandler}
          overScrollMode="never"
          scrollEventThrottle={16}
        />
        <View reanimated absB absR marginB-16 marginR-16 style={addButtonViewAnimatedStyle}>
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
  expensesView: {
    borderTopLeftRadius: BorderRadiuses.br60,
    borderTopRightRadius: BorderRadiuses.br60,
    ...Shadows.sh30.top,
  },
  flatList: {
    height:
      dimensions.window.height -
      (initialWindowMetrics?.insets.bottom || 0) -
      (initialWindowMetrics?.insets.top || 0) +
      BALANCE_VIEW_DEFAULT_HEIGHT,
    paddingHorizontal: 10,
  },
  currencyButton: {
    width: 25,
    height: 25,
    backgroundColor: Colors.rgba(Colors.black, 0.4),
  },
  settingsButtonView: {
    paddingTop: (initialWindowMetrics?.insets.top || 0) + 12,
    paddingRight: 12,
    zIndex: 10,
  },
});

const data = Array(20)
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
