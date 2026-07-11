import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { AppError } from "../../core/errors/app-error";
import { ApiResponse } from "../../core/responses/api-response";
import { uploadService } from "./service";
import { uploadValidator } from "./validator";

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
      throw new AppError(
        "No file uploaded",
        400,
        "NO_FILE_UPLOADED"
      );
    }

    const filename = uploadValidator.validate(
      file.filename
    );

    const uploadedFile =
      await uploadService.uploadFile(
        jobId,
        filename,
        file.filename,
        file.mimetype,
        file.file
      );

    return reply.send(
      ApiResponse.success(
        uploadedFile,
        "File uploaded successfully",
        request.requestId
      )
    );
  }
}

export const uploadController =
  new UploadController();