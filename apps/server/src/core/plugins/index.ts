import { registerCors } from "./cors";
import { registerMultipart } from "./multipart";
import { registerSwagger } from "./swagger";
import type { FastifyInstance } from "fastify";

export async function registerPlugins(app: FastifyInstance) {
  await registerCors(app);

  await registerMultipart(app);

  await registerSwagger(app);
}