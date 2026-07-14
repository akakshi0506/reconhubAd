import type { FastifyInstance } from "fastify";

import { reconciliationController } from "./controller";

export async function registerReconciliationModule(
  app: FastifyInstance
) {
  app.post(
    "/jobs/:jobId/reconcile",
    reconciliationController.reconcile
  );
}