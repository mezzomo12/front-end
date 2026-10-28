import { StyleSheet, TextInput, View } from 'react-native';

import { colors, fontSizes, fonts, spacing } from '../constants/theme';
import IconButton from './IconButton';

// Campo de pesquisa com lupa. `onSubmitEditing` dispara pelo teclado e pela lupa.
export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  placeholder = 'Pesquisa',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        accessibilityRole="search"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        style={styles.input}
      />
      <IconButton name="search-outline" label="Pesquisar" size={22} onPress={onSubmitEditing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.input,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: fontSizes.md,
  },
});
