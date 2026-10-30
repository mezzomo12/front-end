// Normaliza o texto para comparação: minúsculas e sem acentos ("Explosões" -> "explosoes").
export function normalizeText(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Verdadeiro se todas as palavras da busca aparecem no texto, ignorando acentos e maiúsculas.
// Busca vazia casa com tudo.
export function matchesQuery(text, query) {
  const words = normalizeText(query ?? '').split(/\s+/).filter(Boolean);
  const haystack = normalizeText(text);
  return words.every((word) => haystack.includes(word));
}
