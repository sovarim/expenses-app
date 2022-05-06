import { StyleSheet } from 'react-native';
import { Colors, View, ViewProps } from 'react-native-ui-lib';

export type BackdropProps = {
  children?: React.ReactNode;
} & ViewProps;

const Backdrop = (props: BackdropProps) => {
  return (
    <View style={styles.backdrop}>
      <View {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flexGrow: 1,
    backgroundColor: Colors.rgba(Colors.black, 0.6),
  },
});

export default Backdrop;
