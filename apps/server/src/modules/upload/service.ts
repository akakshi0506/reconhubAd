import path from "node:path";
import { randomUUID } from "node:crypto";

import { AppError } from "../../core/errors/app-error";
import { storageService } from "../../core/storage/storage.service";
import { jobRepository } from "../jobs/repository";
import type {
  UploadedFile,
  UploadMetadata,
} from "./types";

export class UploadService {
  async prepareWorkspace(jobId: string): Promise<void> {
    const job = jobRepository.findById(jobId);

    if (!job) {
      throw new AppError(
        "Job not found",
        404,
        "JOB_NOT_FOUND"
      );
    }

    await storageService.createJobWorkspace(jobId);
  }

  async uploadFile(
    jobId: string,
    filename: string,
    originalFilename: string,
    mimeType: string,
    stream: NodeJS.ReadableStream
  ): Promise<UploadedFile> {
    const fileExists =
      await storageService.uploadExists(
        jobId,
        filename
      );

    if (fileExists) {
      throw new AppError(
        "File already exists",
        409,
        "FILE_ALREADY_EXISTS"
      );
    }

    await storageService.saveUploadStream(
      jobId,
      filename,
      stream
    );

    const size =
      await storageService.getUploadFileSize(
        jobId,
        filename
      );

    const uploadedAt = new Date().toISOString();

    const uploadedFile: UploadedFile = {
      id: randomUUID(),
      originalName: originalFilename,
      storedName: filename,
      mimeType,
      extension: path
        .extname(filename)
        .toLowerCase(),
      size,
      uploadedAt,
    };

    const existingMetadata =
      await storageService.readUploadMetadata<UploadMetadata>(
        jobId
      );

    const metadata: UploadMetadata =
      existingMetadata ?? {
        jobId,
        uploadedAt,
        files: [],
      };

    metadata.files.push(uploadedFile);

    await storageService.saveUploadMetadata(
      jobId,
      metadata
    );

    return uploadedFile;
  }
}

export const uploadService = new UploadService();