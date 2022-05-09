import { Colors } from 'react-native-ui-lib';

Colors.loadColors({
  white10: Colors.getColorTint(Colors.white, 10),
  white20: Colors.getColorTint(Colors.white, 20),
  white80: Colors.getColorTint(Colors.white, 80),
  backdrop: Colors.rgba(Colors.black, 0.6),
});

Colors.loadSchemes({
  light: {
    screenBG: Colors.white80,
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50,
  },
  dark: {
    screenBG: Colors.white10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20,
  },
});
