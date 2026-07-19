import Fastify from "fastify";

import { registerErrorHandler } from "./core/errors/error-handler";

import {
  requestIdMiddleware,
  requestLogger,
} from "./core/middleware";
import { registerPlugins } from "./core/plugins";
import { registerHealthModule } from "./modules/health";
import { registerJobModule } from "./modules/jobs";
import { registerUploadModule } from "./modules/upload";
import { registerReconciliationModule } from "./modules/reconciliation";
import { registerReportModule } from "./modules/report";
import { registerEmamiModule } from "./modules/emami";
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
  await registerUploadModule(app);
  await registerReconciliationModule(app);
  await registerReportModule(app);
  await registerEmamiModule(app);
  return app;
}