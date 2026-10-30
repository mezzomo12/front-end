import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import ImageField from '../components/ImageField';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { colors, spacing } from '../constants/theme';
import { validateProduct } from '../utils/validators';

const emptyForm = { title: '', description: '', price: '', image: null };

export default function ProductCreateScreen() {
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
    const found = validateProduct(form);
    setErrors(found);
    setValidated(Object.keys(found).length === 0);
    // Com dados válidos ainda não há o que enviar: a publicação depende do contrato da API.
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ImageField
          label="Imagem do Produto"
          value={form.image}
          onChange={setField('image')}
          error={errors.image}
        />
        <TextField
          label="Título"
          placeholder="Ex: Troll Mutante"
          value={form.title}
          onChangeText={setField('title')}
          error={errors.title}
        />
        <TextField
          label="Descrição do Produto"
          multiline
          value={form.description}
          onChangeText={setField('description')}
          error={errors.description}
        />
        <TextField
          label="Preço"
          keyboardType="decimal-pad"
          value={form.price}
          onChangeText={setField('price')}
          error={errors.price}
        />
        <Button title="Publicar Produto" onPress={submit} />
        {validated ? (
          <AppText color={colors.textMuted}>
            Dados válidos, mas a publicação ainda não está disponível: aguarda a integração com a
            API.
          </AppText>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
});
