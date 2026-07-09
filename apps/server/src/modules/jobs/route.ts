import { FastifyInstance } from "fastify";

import { JobController } from "./controller";

import { createJobSchema } from "./schema";

const controller = new JobController();

export async function jobRoutes(app: FastifyInstance) {
  app.post("/api/v1/jobs",{schema: createJobSchema,},controller.create.bind(controller));

  app.get("/api/v1/jobs", controller.getAll.bind(controller));

  app.get("/api/v1/jobs/:id", controller.getById.bind(controller));

  app.delete("/api/v1/jobs/:id", controller.delete.bind(controller));
}