import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Card from '../components/Card';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { validateProfile } from '../utils/validators';

const emptyForm = { username: '', email: '', link: '' };

export default function MyDataScreen() {
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
          <View style={styles.photoBox}>
            <Ionicons name="camera-outline" size={48} color={colors.primary} />
          </View>
          {/* Escolher foto depende de salvar o perfil na API, ainda sem contrato. */}
          <Button title="Editar foto" variant="outline" size="sm" disabled style={styles.photoButton} />

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
  photoBox: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  photoButton: { alignSelf: 'center' },
});
