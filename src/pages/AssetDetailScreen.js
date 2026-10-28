import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import { ErrorState, LoadingState } from '../components/ListStates';
import Screen from '../components/Screen';
import { colors, spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { getAssetById } from '../services/assetService';
import { formatPrice } from '../utils/format';
import useAsync from '../utils/useAsync';

export default function AssetDetailScreen({ route }) {
  const { id } = route.params;
  const load = useCallback(() => getAssetById(id), [id]);
  const { data: asset, loading, error, reload } = useAsync(load);
  const { isInCart, addItem, removeItem } = useCart();

  if (loading) {
    return (
      <Screen>
        <LoadingState />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <ErrorState message={error.message} onRetry={reload} />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText bold size="xl">
          {asset.title}
        </AppText>
        <AppText bold size="xxl" color={colors.primary}>
          {formatPrice(asset.price)}
        </AppText>
        <AppText color={colors.textMuted}>{asset.description}</AppText>
        {isInCart(asset.id) ? (
          <Button
            title="Remover do carrinho"
            variant="outline"
            onPress={() => removeItem(asset.id)}
          />
        ) : (
          <Button title="Adicionar ao carrinho" onPress={() => addItem(asset)} />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
});
