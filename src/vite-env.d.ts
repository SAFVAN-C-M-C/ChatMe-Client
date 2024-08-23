/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly CHAT_ME_APP_GOOGLE_ID: string;
    readonly CHAT_ME_APP_SERVER_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }