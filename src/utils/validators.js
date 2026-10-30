// Validações de formulário feitas no app. São regras provisórias de interface:
// a API pode impor regras próprias, que prevalecem quando o contrato for confirmado.
// Cada validador devolve um objeto { campo: mensagem }; vazio significa dados válidos.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

// Converte texto digitado ("19,90" ou "19.90") em número; devolve NaN se inválido.
export function parsePrice(text) {
  const normalized = String(text).trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return NaN;
  return Number(normalized);
}

export function validateRegister({ email, password, confirmPassword }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'E-mail inválido.';
  }

  if (!password) {
    errors.password = 'Informe a senha.';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirme a senha.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'As senhas não coincidem.';
  }

  return errors;
}

export function validateProduct({ title, description, price, image }) {
  const errors = {};

  if (!title.trim()) errors.title = 'Informe o título.';
  if (!image) errors.image = 'Escolha a imagem do produto.';
  if (!description.trim()) errors.description = 'Informe a descrição.';

  if (!price.trim()) {
    errors.price = 'Informe o preço.';
  } else if (Number.isNaN(parsePrice(price)) || parsePrice(price) <= 0) {
    errors.price = 'Preço inválido. Use um valor como 19,90.';
  }

  return errors;
}

const URL_PATTERN = /^https?:\/\/[^\s.]+\.[^\s]+$/i;

// O link é opcional; quando preenchido, deve começar com http:// ou https://.
export function validateProfile({ username, email, link }) {
  const errors = {};

  if (!username.trim()) errors.username = 'Informe o nome de usuário.';

  if (!email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'E-mail inválido.';
  }

  if (link.trim() && !URL_PATTERN.test(link.trim())) {
    errors.link = 'Link inválido. Use um endereço como https://meusite.com.';
  }

  return errors;
}
