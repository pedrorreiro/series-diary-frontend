export function useValidate() {
  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  return {
    validateEmail
  };
}
