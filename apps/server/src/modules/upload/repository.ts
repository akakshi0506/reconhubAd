import { UploadMetadata } from "./types";

class UploadRepository {
  private readonly uploads = new Map<string, UploadMetadata>();

  save(metadata: UploadMetadata) {
    this.uploads.set(metadata.jobId, metadata);
    return metadata;
  }

  find(jobId: string) {
    return this.uploads.get(jobId);
  }
}

export const uploadRepository = new UploadRepository();