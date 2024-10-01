export function testPassword(password: string) {
  // Verifique as regras
  const minLengthPattern = /.{8,}/; // No mínimo 8 caracteres
  const hasNumberPattern = /\d/; // Pelo menos um número
  const hasUpperCasePattern = /[A-Z]/; // Pelo menos uma letra maiúscula
  const hasSpecialCharPattern = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~)]/; // Pelo menos um caractere especial

  if (!minLengthPattern.test(password)) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }
  if (!hasNumberPattern.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }
  if (!hasUpperCasePattern.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }
  if (!hasSpecialCharPattern.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial.';
  }

  return null;
}
