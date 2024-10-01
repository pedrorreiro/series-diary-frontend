import { translations } from './i18n'

export type TranslationNamespace = {
  [namespace: string]: {
    [language: string]: Record<string, string>
  }
}

export type Translations = {
  [namespace: string]: {
    [language: string]: Record<string, string>
  }
}

export const combineNamespaceTranslations = (language: string) => {
  return Object.keys(translations).reduce(
    (nsAcc, namespace) => {
      nsAcc[namespace] = translations[namespace][language]
      return nsAcc
    },
    {} as { [namespace: string]: Record<string, string> }
  )
}

export const InputValidation = {
  en: {
    email: 'Invalid email'
  },
  pt: {
    email: 'Email inválido'
  }
}
