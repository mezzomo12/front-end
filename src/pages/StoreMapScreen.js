import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '../components/AppText';
import BackgroundImage from '../components/BackgroundImage';
import IconButton from '../components/IconButton';
import Screen from '../components/Screen';
import SearchBar from '../components/SearchBar';
import { categories } from '../constants/categories';
import { mapBackground, mapBackgroundSize } from '../constants/images';
import { colors, effects, spacing } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { coverPoint } from '../utils/imageLayout';

const MAP_BLUR = 3;
// Área reservada a cada rótulo; o rótulo fica centralizado nela, no ponto do mapa.
const SLOT = { width: 160, height: 44 };

// Menu principal: busca, configurações, carrinho e categorias sobre o mapa.
export default function StoreMapScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [mapSize, setMapSize] = useState(null);
  const { count } = useCart();
  const insets = useSafeAreaInsets();

  const search = () => {
    const text = query.trim();
    if (text) {
      navigation.navigate('AssetList', { title: `Busca: ${text}`, query: text });
    }
  };

  return (
    <Screen>
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <IconButton
          name="arrow-back"
          label="Voltar"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={search}
          style={styles.search}
        />
        <IconButton
          name="settings-outline"
          label="Configurações"
          size={32}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View
        style={styles.map}
        onLayout={({ nativeEvent }) => setMapSize(nativeEvent.layout)}
      >
        {/* O mapa começa abaixo da barra de busca, sem sobreposição; desfocado e escurecido
            para manter os rótulos legíveis. */}
        <BackgroundImage
          source={mapBackground}
          imageSize={mapBackgroundSize}
          blur={MAP_BLUR}
          dim={0.35}
        />
        {/* Rótulos ancorados ao desenho do mapa: acompanham o corte do "cover" em qualquer tela. */}
        {mapSize
          ? categories.map((category) => {
              const point = coverPoint({
                container: mapSize,
                image: mapBackgroundSize,
                x: category.x,
                y: category.y,
              });
              return (
                <View
                  key={category.id}
                  pointerEvents="box-none"
                  style={[
                    styles.slot,
                    { left: point.left - SLOT.width / 2, top: point.top - SLOT.height / 2 },
                  ]}
                >
                  <Pressable
                    accessibilityRole="button"
                    onPress={() =>
                      navigation.navigate('AssetList', {
                        title: category.name,
                        categoryId: category.id,
                      })
                    }
                    style={({ pressed }) => [styles.label, effects.raised, pressed && effects.pressed]}
                  >
                    <AppText bold size="sm" color={colors.primary}>
                      {category.name}
                    </AppText>
                  </Pressable>
                </View>
              );
            })
          : null}

        <IconButton
          name="cart-outline"
          label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
          size={44}
          bordered
          onPress={() => navigation.navigate('Cart')}
          style={styles.cart}
        >
          {count > 0 ? (
            <View style={styles.badge}>
              <AppText bold size="sm" color={colors.textOnPrimary}>
                {count}
              </AppText>
            </View>
          ) : null}
        </IconButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  search: { flex: 1 },
  map: { flex: 1, overflow: 'hidden' },
  slot: {
    position: 'absolute',
    width: SLOT.width,
    height: SLOT.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  cart: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 72,
    height: 66,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
