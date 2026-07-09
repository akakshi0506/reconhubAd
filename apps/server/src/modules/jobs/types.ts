export enum JobStatus {
  CREATED = "CREATED",
  FILES_UPLOADED = "FILES_UPLOADED",
  ANALYZED = "ANALYZED",
  MAPPED = "MAPPED",
  VALIDATED = "VALIDATED",
  MERGED = "MERGED",
  EXPORTED = "EXPORTED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum WorkflowType {
  UC_SAP = "UC_SAP",
  UC_PP_WH = "UC_PP_WH",
}

export interface Job {
  id: string;

  workflow: WorkflowType;

  status: JobStatus;

  createdAt: Date;

  updatedAt: Date;

  files: string[];
}