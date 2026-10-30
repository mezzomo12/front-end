import { Image, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { logo } from '../constants/images';
import { colors, spacing } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo do Pixel Hunter" />
      <AppText bold size="xxl" color={colors.primary} style={styles.title}>
        Pixel Hunter
      </AppText>
      <TextField label="Login" autoCapitalize="none" />
      <TextField label="Senha" secureTextEntry />
      {/* Login ainda não existe: depende do contrato de autenticação da API. */}
      <Button title="Entrar" disabled />
      <Button title="Cadastrar" variant="outline" size="sm" onPress={() => navigation.navigate('Register')} />
      {/* Atalho provisório enquanto não há login, para alcançar o resto do app. */}
      <Button title="Explorar lojas" variant="outline" size="sm" onPress={() => navigation.navigate('StoreMap')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', padding: spacing.lg, gap: spacing.md },
  logo: { alignSelf: 'center', width: 200, height: 200 },
  title: { textAlign: 'center', marginBottom: spacing.md },
});
