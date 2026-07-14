import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "ReconHub API",
        version: "1.0.0",
      },
    },

    transform: ({ schema, url }) => {
      if (url === "/api/v1/jobs/:jobId/files") {
        return {
          schema: {
            ...schema,

            consumes: ["multipart/form-data"],

            body: {
              type: "object",
              required: ["file"],
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
          url,
        };
      }

      return {
        schema,
        url,
      };
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });
}