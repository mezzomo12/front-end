import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from '../components/Screen';
import { spacing } from '../constants/theme';

export default function SettingsScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Button title="Meus Dados" variant="outline" onPress={() => navigation.navigate('MyData')} />
      <Button title="Meus Pedidos" variant="outline" onPress={() => navigation.navigate('Orders')} />
      <Button
        title="Atendimento ao Cliente"
        variant="outline"
        onPress={() => navigation.navigate('Support')}
      />
      <Button title="Cadastrar Produto" onPress={() => navigation.navigate('ProductCreate')} />
      <AppText bold style={styles.contacts}>
        Contatos:
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', padding: spacing.lg, gap: spacing.md },
  contacts: { textAlign: 'center', marginTop: spacing.lg },
});
