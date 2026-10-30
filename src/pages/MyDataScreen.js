import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Card from '../components/Card';
import ImageField from '../components/ImageField';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { useProfile } from '../context/ProfileContext';
import { validateProfile } from '../utils/validators';

const emptyForm = { username: '', email: '', link: '' };

export default function MyDataScreen() {
  const { photo, setPhoto } = useProfile();
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
    const found = validateProfile(form);
    setErrors(found);
    setValidated(Object.keys(found).length === 0);
    // Com dados válidos ainda não há o que salvar: depende do contrato de usuário da API.
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Card>
          {/* A foto fica só no app (em memória): enviá-la ao servidor depende do contrato da API. */}
          <ImageField
            square
            size={140}
            icon="camera-outline"
            pickTitle="Editar foto"
            changeTitle="Editar foto"
            value={photo}
            onChange={setPhoto}
          />

          <TextField
            label="Nome de usuário:"
            placeholder="Ex: Fallen123"
            autoCapitalize="none"
            value={form.username}
            onChangeText={setField('username')}
            error={errors.username}
          />
          <TextField
            label="Email utilizado:"
            placeholder="Ex: Fallen123@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={setField('email')}
            error={errors.email}
          />
          <TextField
            label="Adicionar link:"
            placeholder="Adicione um link para aumentar o trafego"
            keyboardType="url"
            autoCapitalize="none"
            value={form.link}
            onChangeText={setField('link')}
            error={errors.link}
          />
          <Button title="Salvar" onPress={submit} />
          {validated ? (
            <AppText size="sm" color={colors.textMuted}>
              Dados válidos, mas salvar ainda não está disponível: aguarda a integração com a API.
            </AppText>
          ) : null}
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
});
