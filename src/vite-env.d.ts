/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly CHAT_ME_APP_GOOGLE_ID: string;
    readonly CHAT_ME_APP_SERVER_URL: string;
    readonly VITE_CHAT_ME_APP_NOTIFICATION_SERVER_URL: string;
    readonly VITE_CHAT_ME_APP_CHAT_SERVER_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }