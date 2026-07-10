import type { FastifyInstance } from "fastify";

import { uploadRoutes } from "./route";

export async function registerUploadModule(
  app: FastifyInstance
) {
  await uploadRoutes(app);
}