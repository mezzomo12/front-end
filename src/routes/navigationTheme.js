import { DarkTheme } from '@react-navigation/native';

import { colors, fonts } from '../constants/theme';

// Tema do React Navigation alinhado aos tokens do app (cores e fonte pixel art).
const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    notification: colors.primary,
  },
  fonts: {
    regular: { fontFamily: fonts.regular, fontWeight: '400' },
    medium: { fontFamily: fonts.regular, fontWeight: '400' },
    bold: { fontFamily: fonts.bold, fontWeight: '400' },
    heavy: { fontFamily: fonts.bold, fontWeight: '400' },
  },
};

export default navigationTheme;
