// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STORYBOOK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}