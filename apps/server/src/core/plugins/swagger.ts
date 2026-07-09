import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "ReconHub API",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });
}