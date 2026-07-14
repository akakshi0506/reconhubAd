import type { FastifyInstance } from "fastify";

import { reportController } from "./controller";

export async function registerReportModule(
  app: FastifyInstance
) {
  app.get(
    "/jobs/:jobId/report",
    reportController.download
  );
}