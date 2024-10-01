import type { InjectionKey, Ref } from 'vue'

interface ILoading {
  toggle: () => void
  get: Ref<boolean>
}

export const LoadingKey: InjectionKey<ILoading> = Symbol('LoadingKey')
