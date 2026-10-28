import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { coverRect } from '../utils/imageLayout';

// Imagem de fundo que preenche o container pai (position: 'absolute') no modo "cover", adaptando-se
// a qualquer tela. O tamanho e a posição são calculados aqui (e não pelo `cover` do <Image>) para
// que elementos ancorados à imagem, via utils/imageLayout, fiquem alinhados com o desenho.
// `blur` desfoca a imagem; `dim` (0 a 1) a escurece para dar legibilidade.
// O pai precisa de overflow: 'hidden', pois a imagem é cortada nas bordas.
export default function BackgroundImage({ source, imageSize, blur = 0, dim = 0 }) {
  const [container, setContainer] = useState(null);

  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      onLayout={({ nativeEvent }) => setContainer(nativeEvent.layout)}
    >
      {container ? (
        <Image
          source={source}
          style={[styles.image, coverRect({ container, image: imageSize })]}
          resizeMode="stretch"
          blurRadius={blur}
          accessible={false}
        />
      ) : null}
      {dim > 0 ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0, 0, 0, ${dim})` }]} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { position: 'absolute' },
});
