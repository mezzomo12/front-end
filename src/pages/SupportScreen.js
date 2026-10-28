import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import AppText from '../components/AppText';
import Button from '../components/Button';
import Card from '../components/Card';
import Screen from '../components/Screen';
import { supportInfo } from '../constants/support';
import { colors, spacing } from '../constants/theme';
import { isSupportOpen } from '../utils/supportHours';

async function open(url) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Não foi possível abrir', 'Nenhum aplicativo disponível para esta ação.');
  }
}

export default function SupportScreen() {
  const online = isSupportOpen();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText color={colors.textMuted}>{supportInfo.intro}</AppText>
        <AppText color={colors.textMuted}>{supportInfo.hours}</AppText>

        <Card>
          <View style={styles.cardHeader}>
            <Ionicons name="call-outline" size={28} color={colors.primary} />
            <AppText bold size="lg" color={colors.primary}>
              Telefones
            </AppText>
          </View>
          <View style={styles.phoneRow}>
            <AppText bold color={online ? colors.primary : colors.textMuted}>
              {online ? '● ONLINE' : '● OFFLINE'}
            </AppText>
            <View style={styles.phones}>
              <AppText bold>Contatos:</AppText>
              {supportInfo.phones.map((phone) => (
                <Pressable
                  key={phone}
                  accessibilityRole="link"
                  accessibilityLabel={`Ligar para ${phone}`}
                  onPress={() => open(`tel:${phone.replace(/\D/g, '')}`)}
                >
                  <AppText size="sm">{phone}</AppText>
                </Pressable>
              ))}
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <Ionicons name="mail-outline" size={28} color={colors.primary} />
            <AppText bold size="lg" color={colors.primary}>
              Nos envie um e-mail
            </AppText>
          </View>
          <View style={styles.mailRow}>
            <AppText size="sm" color={colors.textMuted} style={styles.reply}>
              {supportInfo.replyTime}
            </AppText>
            <Button
              title="Enviar e-mail"
              variant="outline"
              size="sm"
              disabled={!supportInfo.email}
              onPress={() => open(`mailto:${supportInfo.email}`)}
            />
          </View>
          {!supportInfo.email ? (
            <AppText size="sm" color={colors.textMuted}>
              O e-mail de atendimento ainda não foi definido.
            </AppText>
          ) : null}
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 96,
  },
  phones: { alignItems: 'flex-end', gap: spacing.xs },
  mailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.md,
    minHeight: 96,
  },
  reply: { flex: 1 },
});
