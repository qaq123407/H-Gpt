export const appConfig = () => ({
  port: Number(process.env.SERVER_PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL
});
