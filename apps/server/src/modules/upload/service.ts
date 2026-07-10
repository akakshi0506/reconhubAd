import { storageService } from "../../core/storage";
import { jobRepository } from "../jobs/repository";

export class UploadService {
  async prepareWorkspace(jobId: string) {
    const job = jobRepository.findById(jobId);

    if (!job) {
      throw new Error("Job not found");
    }

    await storageService.createJobWorkspace(jobId);

    return job;
  }

  async saveUploadedFile(
    jobId: string,
    filename: string,
    buffer: Buffer
  ) {
    return storageService.saveUpload(
      jobId,
      filename,
      buffer
    );
  }
}

export const uploadService = new UploadService();