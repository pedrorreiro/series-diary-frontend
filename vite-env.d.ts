/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERIE_API_BASE_URL: string
  readonly VITE_SERIE_API_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
