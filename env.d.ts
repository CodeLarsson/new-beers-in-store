declare namespace NodeJS {
  export interface ProcessEnv {
    BOLAGET_API_KEY: string;
    BOLAGET_API_BASE_URL: string;
    PORT: string;
    // Add other environment variables as needed
  }
}
