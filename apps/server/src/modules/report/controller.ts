import fs from "node:fs/promises";
import path from "node:path";

import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { storageService } from "../../core/storage/storage.service";

export class ReportController {
  async download(
    request: FastifyRequest<{
      Params: {
        jobId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const reportPath = path.join(
      storageService.getStorageRoot(),
      request.params.jobId,
      "reports",
      "Reconciliation_Report.xlsx"
    );

    const file = await fs.readFile(reportPath);

    reply
      .header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      .header(
        "Content-Disposition",
        'attachment; filename="Reconciliation_Report.xlsx"'
      );

    return reply.send(file);
  }
}

export const reportController =
  new ReportController();