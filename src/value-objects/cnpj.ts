export function useCnpj() {
  function isValid(cnpj: string): boolean {
    const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const c = cnpj.replace(/[^\d]/g, '');

    if (c.length !== 14) return false;

    if (/^(\d)\1+$/.test(c)) return false;

    let n = 0;
    for (let i = 0; i < 12; i++) {
      n += parseInt(c[i]) * b[i + 1];
    }
    const digito1 = (n %= 11) < 2 ? 0 : 11 - n;
    if (parseInt(c[12]) !== digito1) return false;

    n = 0;
    for (let i = 0; i <= 12; i++) {
      n += parseInt(c[i]) * b[i];
    }
    const digito2 = (n %= 11) < 2 ? 0 : 11 - n;
    if (parseInt(c[13]) !== digito2) return false;

    return true;
  }

  return {
    isValid
  };
}
