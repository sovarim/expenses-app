import { Card, Text, View, CardProps } from 'react-native-ui-lib';
import formatNumber from '../utils/formatNumber';

export type ExpenseCardProps = {
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  remain: number;
} & CardProps;

const ExpenseCard = ({
  name,
  startDate,
  endDate,
  budget,
  spent,
  remain,
  ...props
}: ExpenseCardProps) => {
  return (
    <Card row {...props}>
      <Card.Section
        content={[
          { text: 'Название', t3: true, $textDisabled: true },
          { text: name, t1: true, $textPrimary: true },
          {
            text: 'Дата',
            t3: true,
            $textDisabled: true,
            'marginT-8': true,
            'marginB-4': true,
          },
          {
            text: `${startDate} - ${endDate}`,
            t2: true,
            textColor: true,
          },
        ]}
        padding-20
      />
      <View flexG paddingV-20 paddingR-20>
        <View flex right>
          <Text t3 $textDisabled>
            Бюджет
          </Text>
          <Text t1 $textPrimary>
            {formatNumber(budget)}₽
          </Text>
        </View>
        <View row flex spread marginT-8>
          <View>
            <Text t3 $textDisabled>
              Потрачено
            </Text>
            <View flex right>
              <Text t2 $textDangerLight>
                {formatNumber(spent)}₽
              </Text>
            </View>
          </View>
          <View flex right>
            <Text t3 $textDisabled>
              Осталось
            </Text>
            <Text t2 $textSuccess>
              {formatNumber(remain)}₽
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ExpenseCard;
