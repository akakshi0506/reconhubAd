export interface UploadedFile {
  id: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  extension: string;
  size: number;
  uploadedAt: string;
}

export interface UploadMetadata {
  jobId: string;
  uploadedAt: string;
  files: UploadedFile[];
}