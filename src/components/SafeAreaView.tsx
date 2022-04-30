import { View, ViewProps } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaView = ({ style, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default SafeAreaView;
