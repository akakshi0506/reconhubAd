import { FastifyInstance } from "fastify";

import { ApiResponse } from "../responses/api-response";
import { AppError } from "./app-error";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(
        ApiResponse.error(
          error.message,
          {
            code: error.code,
          },
          request.requestId
        )
      );
    }

    request.log.error(error);

    return reply.status(500).send(
      ApiResponse.error(
        "Internal Server Error",
        {
          code: "INTERNAL_SERVER_ERROR",
        },
        request.requestId
      )
    );
  });
}