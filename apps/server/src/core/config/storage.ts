import path from "node:path";

export const STORAGE_ROOT = path.resolve(
  process.cwd(),
  "../../storage"
);

export const JOB_STORAGE = path.join(
  STORAGE_ROOT,
  "jobs"
);