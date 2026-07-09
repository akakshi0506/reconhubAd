import { FastifyInstance } from "fastify";
import { healthRoutes } from "./route";

export async function registerHealthModule(
  app: FastifyInstance
) {
  await healthRoutes(app);
}