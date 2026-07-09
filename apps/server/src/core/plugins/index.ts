// src/core/plugins/index.ts

import { FastifyInstance } from "fastify";
import { registerCors } from "./cors";
import { registerSwagger } from "./swagger";

export async function registerPlugins(app: FastifyInstance) {
  await registerCors(app);
  await registerSwagger(app);
}