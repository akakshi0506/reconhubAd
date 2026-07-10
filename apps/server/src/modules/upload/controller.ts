import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { ApiResponse } from "../../core/responses/api-response";
import { uploadService } from "./service";

export class UploadController {
  async upload(
    request: FastifyRequest<{
      Params: {
        jobId: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { jobId } = request.params;

    await uploadService.prepareWorkspace(jobId);

    const file = await request.file();

    if (!file) {
      throw new Error("No file uploaded");
    }

    const buffer = await file.toBuffer();

    await uploadService.saveUploadedFile(
      jobId,
      file.filename,
      buffer
    );

    return reply.send(
      ApiResponse.success(
        {
          filename: file.filename,
        },
        "File uploaded successfully",
        request.requestId
      )
    );
  }
}

export const uploadController =
  new UploadController();