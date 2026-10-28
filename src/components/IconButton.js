import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

import { colors, effects } from '../constants/theme';

// Botão só com ícone (Ionicons). `label` é obrigatório: é o texto lido por leitores de tela.
// `bordered` desenha a moldura verde com fundo escuro; `children` permite sobrepor um selo.
export default function IconButton({ name, label, onPress, size = 28, bordered, style, children }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        bordered && styles.bordered,
        bordered && effects.raised,
        pressed && (bordered ? effects.pressed : styles.pressed),
        style,
      ]}
    >
      <Ionicons name={name} size={size} color={colors.primary} />
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', justifyContent: 'center' },
  bordered: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.7 },
});
