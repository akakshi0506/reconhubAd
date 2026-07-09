import { FastifyInstance } from "fastify";
import { HealthController } from "./controller";

const controller = new HealthController();

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", controller.getHealth);
}