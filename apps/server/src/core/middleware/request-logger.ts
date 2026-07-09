import { FastifyReply, FastifyRequest } from "fastify";

export async function requestLogger(
  request: FastifyRequest,
  _: FastifyReply
) {
  request.log.info({
    requestId: request.requestId,
    method: request.method,
    url: request.url,
  });
}