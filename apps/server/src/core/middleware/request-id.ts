import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";

declare module "fastify" {
  interface FastifyRequest {
    requestId: string;
  }
}

export async function requestIdMiddleware(
  request: FastifyRequest,
  _: FastifyReply
) {
  request.requestId = randomUUID();
}