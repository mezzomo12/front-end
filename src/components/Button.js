import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { colors, effects, spacing } from '../constants/theme';
import AppText from './AppText';

// variant: 'primary' (preenchido em verde, ação principal da tela) ou 'outline' (secundário).
// size: 'md' ou 'sm' (ações secundárias).
export default function Button({ title, onPress, variant = 'primary', size = 'md', disabled, loading, style }) {
  const isPrimary = variant === 'primary';
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!inactive }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.outline,
        size === 'sm' && styles.small,
        inactive ? styles.inactive : effects.raised,
        pressed && !inactive && effects.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.textOnPrimary : colors.primary} />
      ) : (
        <AppText bold size={size === 'sm' ? 'sm' : 'md'} color={isPrimary ? colors.textOnPrimary : colors.primary}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  outline: { backgroundColor: colors.background },
  small: { minHeight: 36, paddingHorizontal: spacing.md },
  inactive: { opacity: 0.5 },
});
