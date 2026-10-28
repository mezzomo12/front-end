import { StyleSheet, TextInput, View } from 'react-native';

import { colors, fontSizes, fonts, spacing } from '../constants/theme';
import AppText from './AppText';

// Campo de texto com rótulo e mensagem de erro de validação.
export default function TextField({ label, error, multiline, style, ...props }) {
  return (
    <View style={styles.wrapper}>
      {label ? <AppText size="sm" color={colors.textMuted}>
          {label}
        </AppText> : null}
      <TextInput
        {...props}
        multiline={multiline}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, multiline && styles.multiline, error && styles.inputError, style]}
      />
      {error ? (
        <AppText size="sm" color={colors.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  input: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.input,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
  },
  multiline: {
    minHeight: 96,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
  inputError: { borderColor: colors.error },
});
