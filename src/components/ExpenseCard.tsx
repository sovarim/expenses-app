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
          { text: 'Название', text90H: true, $textDisabled: true },
          { text: name, text70: true, $textPrimary: true },
          {
            text: 'Дата',
            text90H: true,
            $textDisabled: true,
            'marginT-8': true,
            'marginB-4': true,
          },
          {
            text: `${startDate} - ${endDate}`,
            text80: true,
            textColor: true,
          },
        ]}
        padding-20
      />
      <View flexG padding-20>
        <View flex right>
          <Text text90H $textDisabled>
            Бюджет
          </Text>
          <Text text70 $textPrimary>
            {formatNumber(budget)}₽
          </Text>
        </View>
        <View row flex spread marginT-8>
          <View>
            <Text text90H $textDisabled>
              Потрачено
            </Text>
            <View flex right>
              <Text text80 $textDangerLight>
                {formatNumber(spent)}₽
              </Text>
            </View>
          </View>
          <View flex right>
            <Text text90H $textDisabled>
              Осталось
            </Text>
            <Text text80 $textSuccess>
              {formatNumber(remain)}₽
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ExpenseCard;
