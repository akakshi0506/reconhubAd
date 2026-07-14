import type { FastifyInstance } from "fastify";

import { uploadController } from "./controller";
import { uploadFileSchema } from "./schema";

export async function uploadRoutes(
  app: FastifyInstance
) {
  app.post(
    "/api/v1/jobs/:jobId/files",
    {
      schema: uploadFileSchema,
    },
    uploadController.upload.bind(uploadController)
  );
}