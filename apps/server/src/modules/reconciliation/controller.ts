import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { ApiResponse } from "../../core/responses/api-response";

import { reconciliationService } from "./service";

export class ReconciliationController {
  async reconcile(
    request: FastifyRequest<{
      Params: {
        jobId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const result =
      await reconciliationService.reconcileJob(
        request.params.jobId
      );

    return reply.send(
      ApiResponse.success(
        result,
        "Reconciliation completed",
        request.requestId
      )
    );
  }
}

export const reconciliationController =
  new ReconciliationController();