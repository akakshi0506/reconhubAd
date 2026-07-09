import { buildApp } from "./app";
import { env } from "./core/config/env";

async function bootstrap() {
  const app = await buildApp();

  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT,
    });

    app.log.info(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();