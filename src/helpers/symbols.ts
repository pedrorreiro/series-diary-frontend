import type { InjectionKey, Ref } from 'vue'

interface ILoading {
  toggle: () => void
  get: Ref<boolean>
}

interface IDarkMode {
  toggle: () => void
  get: Ref<boolean>
  set: (value: boolean | null) => void
}

export const LoadingKey: InjectionKey<ILoading> = Symbol('LoadingKey')
export const DarkModeKey: InjectionKey<IDarkMode> = Symbol('DarkModeKey')
