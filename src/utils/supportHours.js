// Horário de atendimento em Brasília (UTC-3), por dia da semana (0 = domingo): [abre, fecha) em horas.
// Feriados nacionais não são considerados.
const BRASILIA_OFFSET_MS = -3 * 60 * 60 * 1000;
const SCHEDULE = {
  0: null,
  1: [8, 20],
  2: [8, 20],
  3: [8, 20],
  4: [8, 20],
  5: [8, 20],
  6: [9, 15],
};

export function isSupportOpen(now = new Date()) {
  const local = new Date(now.getTime() + BRASILIA_OFFSET_MS);
  const hours = SCHEDULE[local.getUTCDay()];
  if (!hours) return false;

  const time = local.getUTCHours() + local.getUTCMinutes() / 60;
  return time >= hours[0] && time < hours[1];
}
