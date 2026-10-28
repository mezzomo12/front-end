import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../constants/theme';
import AppText from './AppText';
import Button from './Button';

export function LoadingState() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

// Exibe a mensagem de erro real e, se `onRetry` existir, um botão para tentar de novo.
export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <AppText color={colors.error} style={styles.text}>
        {message}
      </AppText>
      {onRetry ? <Button title="Tentar de novo" variant="outline" onPress={onRetry} /> : null}
    </View>
  );
}

export function EmptyState({ message }) {
  return (
    <View style={styles.center}>
      <AppText color={colors.textMuted} style={styles.text}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  text: { textAlign: 'center' },
});
