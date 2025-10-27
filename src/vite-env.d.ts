/// <reference types="vite/client" />

// 任意：独自ENVを型付けしたい場合
interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
