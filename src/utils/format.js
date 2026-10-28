// Formata um valor numérico como preço em reais (ex.: 29.9 -> "R$ 29,90").
export function formatPrice(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
