import { FastifyInstance } from "fastify";

import { jobRoutes } from "./route";

export async function registerJobModule(
  app: FastifyInstance
) {
  await jobRoutes(app);
}