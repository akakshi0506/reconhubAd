import type { FastifyInstance } from "fastify";

import { emamiController } from "./controller";

export async function registerEmamiModule(app: FastifyInstance) {
  app.post("/api/v1/jobs/:jobId/emami", emamiController.process);
}
