import { FastifyReply, FastifyRequest } from "fastify";

import { ApiResponse } from "../../core/responses/api-response";
import { HealthService } from "./service";

const service = new HealthService();

export class HealthController {
  getHealth(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    return reply.send(
      ApiResponse.success(
        service.getHealth(),
        "Health check successful",
        request.requestId
      )
    );
  }
}