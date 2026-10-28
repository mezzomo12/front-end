import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/theme';

// Container base das telas. Para fundo com imagem, use <BackgroundImage> dentro de um filho.
export default function Screen({ style, children }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
