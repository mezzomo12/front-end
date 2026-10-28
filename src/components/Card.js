import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../constants/theme';

// Painel cinza-escuro com borda verde, usado para agrupar conteúdo nas telas.
export default function Card({ style, children }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
});
