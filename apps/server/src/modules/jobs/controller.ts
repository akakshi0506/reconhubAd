import { FastifyReply, FastifyRequest } from "fastify";

import { ApiResponse } from "../../core/responses/api-response";
import { AppError } from "../../core/errors";
import { JobService } from "./service";
import { CreateJobDto } from "./dto";

export class JobController {
  constructor(private readonly service = new JobService()) {}

  create(
    request: FastifyRequest<{ Body: CreateJobDto }>,
    reply: FastifyReply
  ) {
    const job = this.service.create(request.body);

    return reply.code(201).send(
      ApiResponse.success(
        job,
        "Job created successfully",
        request.requestId
      )
    );
  }

  getAll(request: FastifyRequest, reply: FastifyReply) {
    return reply.send(
      ApiResponse.success(
        this.service.getAll(),
        "Jobs fetched successfully",
        request.requestId
      )
    );
  }

  getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const job = this.service.getById(request.params.id);

    if (!job) {
      throw new AppError("Job not found", 404, "JOB_NOT_FOUND");
    }

    return reply.send(
      ApiResponse.success(
        job,
        "Job fetched successfully",
        request.requestId
      )
    );
  }

  delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const deleted = this.service.delete(request.params.id);

    if (!deleted) {
      throw new AppError("Job not found", 404, "JOB_NOT_FOUND");
    }

    return reply.send(
      ApiResponse.success(
        null,
        "Job deleted successfully",
        request.requestId
      )
    );
  }
}