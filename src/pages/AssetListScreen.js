import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AssetCard from '../components/AssetCard';
import BackgroundImage from '../components/BackgroundImage';
import { EmptyState, ErrorState, LoadingState } from '../components/ListStates';
import Screen from '../components/Screen';
import { mapBackground, mapBackgroundSize } from '../constants/images';
import { spacing } from '../constants/theme';
import { getAssets } from '../services/assetService';
import useAsync from '../utils/useAsync';

// Lista de assets de uma categoria (`categoryId`) ou de uma busca (`query`).
export default function AssetListScreen({ route, navigation }) {
  const { categoryId, query } = route.params;
  const load = useCallback(() => getAssets({ categoryId, query }), [categoryId, query]);
  const { data, loading, error, reload } = useAsync(load);

  let content;
  if (loading) {
    content = <LoadingState />;
  } else if (error) {
    content = <ErrorState message={error.message} onRetry={reload} />;
  } else if (data.length === 0) {
    content = <EmptyState message="Nenhum asset encontrado." />;
  } else {
    content = (
      <FlatList
        data={data}
        keyExtractor={(asset) => asset.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <AssetCard
            title={item.title}
            price={item.price}
            onPress={() => navigation.navigate('AssetDetail', { id: item.id })}
          />
        )}
      />
    );
  }

  return (
    <Screen>
      {/* Fundo da loja: mapa nítido, só escurecido para dar leitura aos cards e mensagens. */}
      <BackgroundImage source={mapBackground} imageSize={mapBackgroundSize} dim={0.55} />
      {content}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.md, gap: spacing.md },
});
