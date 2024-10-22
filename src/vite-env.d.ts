/// <reference types="vite/client" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_KAKAO_API: string;
  readonly VITE_CLIENT_URL: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_DOCUMENT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
