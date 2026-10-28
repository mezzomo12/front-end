import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { validateRegister } from '../utils/validators';

const emptyForm = { email: '', password: '', confirmPassword: '' };

export default function RegisterScreen() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  // Atualiza o campo e limpa o erro e o aviso dele, para não mostrar mensagem desatualizada.
  const setField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setValidated(false);
  };

  const submit = () => {
    const found = validateRegister(form);
    setErrors(found);
    setValidated(Object.keys(found).length === 0);
    // Com dados válidos ainda não há o que enviar: o cadastro depende do contrato da API.
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextField
          label="E-mail"
          value={form.email}
          onChangeText={setField('email')}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label="Senha"
          value={form.password}
          onChangeText={setField('password')}
          error={errors.password}
          secureTextEntry
        />
        <TextField
          label="Confirme sua senha"
          value={form.confirmPassword}
          onChangeText={setField('confirmPassword')}
          error={errors.confirmPassword}
          secureTextEntry
        />
        <Button title="Cadastrar" onPress={submit} />
        {validated ? (
          <AppText color={colors.textMuted}>
            Dados válidos, mas o cadastro ainda não está disponível: aguarda a integração com a API.
          </AppText>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
});
