/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Declare module for YAML files
declare module '*.yml' {
  const content: string;
  export default content;
}

declare module '*.yaml' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly RESEND_API_KEY?: string;
  readonly FROM_EMAIL?: string;
  readonly TO_EMAIL?: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

