import { Image, Pressable, StyleSheet, View } from 'react-native';

import { colors, effects, spacing } from '../constants/theme';
import { formatPrice } from '../utils/format';
import AppText from './AppText';

// Card de asset. `image` é uma fonte de imagem do React Native (require ou { uri }).
export default function AssetCard({ title, price, image, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, effects.raised, pressed && effects.pressed]}
    >
      <View style={styles.imageBox}>
        {image ? <Image source={image} style={styles.image} resizeMode="cover" /> : null}
      </View>
      <View style={styles.info}>
        <AppText bold numberOfLines={2}>
          {title}
        </AppText>
        {price != null ? (
          <AppText bold size="lg" color={colors.primary}>
            {formatPrice(price)}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageBox: { height: 120, backgroundColor: colors.input },
  image: { width: '100%', height: '100%' },
  info: { padding: spacing.md, gap: spacing.xs },
});
