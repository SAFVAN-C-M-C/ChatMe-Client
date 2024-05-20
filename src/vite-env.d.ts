/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_REACT_APP_GOOGLE_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }