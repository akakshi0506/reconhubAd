import Fastify from "fastify";

import { logger } from "./core/logger";
import { registerPlugins } from "./core/plugins";
import { registerHealthModule } from "./modules/health";
import {
  requestIdMiddleware,
  requestLogger,
} from "./core/middleware";
import { registerErrorHandler } from "./core/errors/error-handler";
import { truncateSync } from "node:fs";
import { registerJobModule } from "./modules/jobs";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await registerPlugins(app);

  app.addHook("onRequest", requestIdMiddleware);
  app.addHook("preHandler", requestLogger);

  registerErrorHandler(app);

  await registerHealthModule(app);

  await registerJobModule(app);

  return app;
}