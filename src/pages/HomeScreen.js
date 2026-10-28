import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { colors, spacing } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
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
  title: { textAlign: 'center', marginBottom: spacing.md },
});
