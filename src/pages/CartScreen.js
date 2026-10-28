import { FlatList, StyleSheet, View } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import { EmptyState } from '../components/ListStates';
import Screen from '../components/Screen';
import { useCart } from '../context/CartContext';
import { colors, spacing } from '../constants/theme';
import { formatPrice } from '../utils/format';

export default function CartScreen() {
  const { items, total, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <Screen>
        <EmptyState message="Seu carrinho está vazio." />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <AppText bold numberOfLines={2}>
                {item.title}
              </AppText>
              <AppText bold color={colors.primary}>
                {formatPrice(item.price)}
              </AppText>
            </View>
            <Button title="Remover" variant="outline" size="sm" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
      <View style={styles.footer}>
        <AppText bold size="lg">
          Total: {formatPrice(total)}
        </AppText>
        {/* A compra depende do contrato de pedidos/pagamento da API. */}
        <Button title="Finalizar compra" disabled />
        <AppText size="sm" color={colors.textMuted} style={styles.note}>
          A finalização da compra ainda não está disponível: aguarda a integração com a API.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.md, gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  info: { flex: 1, gap: spacing.xs },
  footer: {
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  note: { textAlign: 'center' },
});
