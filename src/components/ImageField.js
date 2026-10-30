import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../constants/theme';
import AppText from './AppText';
import Button from './Button';

// Campo para escolher uma imagem da galeria, com prévia. `value` é a imagem escolhida
// ({ uri, ... }) ou null; `onChange` recebe a nova imagem, ou null ao removê-la.
// A imagem só é escolhida aqui: o envio ao servidor depende da API.
// `square` abre o recorte quadrado (foto de perfil); `size`, `icon` e os títulos dos botões
// adaptam o campo a cada uso.
export default function ImageField({
  label,
  value,
  onChange,
  error,
  square = false,
  size = 180,
  icon = 'image-outline',
  pickTitle = 'Escolher imagem',
  changeTitle = 'Trocar imagem',
}) {
  const [pickError, setPickError] = useState(null);

  const pick = async () => {
    setPickError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        ...(square ? { allowsEditing: true, aspect: [1, 1] } : {}),
      });
      if (!result.canceled) onChange(result.assets[0]);
    } catch {
      setPickError('Não foi possível abrir a galeria. Tente de novo.');
    }
  };

  const message = pickError ?? error;

  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText size="sm" color={colors.textMuted}>
          {label}
        </AppText>
      ) : null}
      <View style={[styles.preview, { width: size, height: size }, message && styles.previewError]}>
        {value ? (
          <Image source={{ uri: value.uri }} style={styles.image} resizeMode="contain" accessibilityLabel="Imagem escolhida" />
        ) : (
          <Ionicons name={icon} size={48} color={colors.primary} />
        )}
      </View>
      <View style={styles.actions}>
        <Button title={value ? changeTitle : pickTitle} variant="outline" size="sm" onPress={pick} />
        {value ? (
          <Button title="Remover" variant="outline" size="sm" onPress={() => onChange(null)} />
        ) : null}
      </View>
      {message ? (
        <AppText size="sm" color={colors.error}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  preview: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.input,
  },
  previewError: { borderColor: colors.error },
  image: { width: '100%', height: '100%' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginTop: spacing.xs },
});
