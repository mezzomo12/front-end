import { Text } from 'react-native';

import { colors, fontSizes, fonts } from '../constants/theme';

// Texto padrão do app: aplica a fonte pixel art e a cor do tema.
export default function AppText({ bold, size = 'md', color = colors.text, style, ...props }) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: bold ? fonts.bold : fonts.regular, fontSize: fontSizes[size], color },
        style,
      ]}
    />
  );
}
