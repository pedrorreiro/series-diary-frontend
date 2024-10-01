import { ErrorTranslation } from '@/views/Error/translation'
import { HomeTranslation } from '@/views/Home/translation'

import { createI18n, type I18n } from 'vue-i18n'
import {
  combineNamespaceTranslations,
  InputValidation,
  type TranslationNamespace,
  type Translations
} from './utils'

export const supportedLanguages: string[] = ['en', 'pt']

export const translations: Translations = {
  InputValidation: InputValidation,
  Error: ErrorTranslation,
  Home: HomeTranslation
}

const messages: TranslationNamespace = supportedLanguages.reduce((acc, language) => {
  acc[language] = combineNamespaceTranslations(language)
  return acc
}, {} as TranslationNamespace)

const i18n: I18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  globalInjection: true,
  messages
})

export default i18n
