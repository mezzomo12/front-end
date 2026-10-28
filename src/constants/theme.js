// Tokens visuais do Pixel Hunter (tema escuro com verde neon, baseado nos frames de design).
import {
  PixelifySans_400Regular,
  PixelifySans_700Bold,
} from '@expo-google-fonts/pixelify-sans';

export const colors = {
  background: '#000000',
  surface: '#2B3036',
  input: '#050805',
  primary: '#6CFF00',
  border: '#4CD100',
  text: '#FFFFFF',
  textMuted: '#9AA39A',
  textOnPrimary: '#000000',
  error: '#FF5C5C',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

// Cantos sempre quadrados (estética pixel art): não há token de raio.

// Efeitos de elevação dos elementos tocáveis: sombra dura deslocada (pixelada) + brilho neon.
// Ao tocar, o elemento "afunda" (sombra menor e deslocamento de 2px).
const shadowColor = '#1F6B00';
const glow = '0px 0px 10px 0px rgba(108, 255, 0, 0.45)';

export const effects = {
  raised: { boxShadow: `3px 3px 0px 0px ${shadowColor}, ${glow}` },
  pressed: {
    boxShadow: `1px 1px 0px 0px ${shadowColor}, ${glow}`,
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
};

// Nomes de família usados nos estilos; devem coincidir com as chaves de `fontFiles`.
export const fonts = {
  regular: 'PixelifySans_400Regular',
  bold: 'PixelifySans_700Bold',
};

// Mapa passado ao useFonts() em App.js.
export const fontFiles = {
  PixelifySans_400Regular,
  PixelifySans_700Bold,
};

export const fontSizes = { sm: 14, md: 16, lg: 20, xl: 28, xxl: 32 };
