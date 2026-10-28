import { StyleSheet } from 'react-native';

import { colors, spacing } from '../constants/theme';
import AppText from './AppText';
import Screen from './Screen';

// Tela provisória da etapa de esqueleto de navegação; será substituída pela tela real.
export default function PlaceholderScreen({ title, children }) {
  return (
    <Screen style={styles.container}>
      <AppText bold size="xl" color={colors.primary}>
        {title}
      </AppText>
      <AppText color={colors.textMuted}>Tela em construção</AppText>
      {children}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
});
