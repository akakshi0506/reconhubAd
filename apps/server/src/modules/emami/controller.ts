import type { FastifyReply, FastifyRequest } from "fastify";

import { ApiResponse } from "../../core/responses/api-response";

import { emamiService } from "./service";
import { emamiReportService } from "./report";

export class EmamiController {
  async process(
    request: FastifyRequest<{
      Params: {
        jobId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const result = await emamiService.process(request.params.jobId);

    const reportPath = await emamiReportService.generate(
      request.params.jobId,
      result,
    );

    return reply.send(
      ApiResponse.success(
        {
          rows: result.length,
          reportPath,
        },
        "Emami report generated successfully",
        request.requestId,
      ),
    );
  }
}

export const emamiController = new EmamiController();
