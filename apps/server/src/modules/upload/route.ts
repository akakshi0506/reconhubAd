import type { FastifyInstance } from "fastify";

import { uploadController } from "./controller";

export async function uploadRoutes(
  app: FastifyInstance
) {

  app.post(
    "/api/v1/jobs/:jobId/files",
    uploadController.upload.bind(uploadController)
  );

}