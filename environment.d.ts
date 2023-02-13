declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
        }
    }
}