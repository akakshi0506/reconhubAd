import path from "node:path";

import { AppError } from "../../core/errors/app-error";

const ALLOWED_EXTENSIONS = new Set([
  ".xlsx",
  ".xls",
  ".csv",
]);

export class UploadValidator {
  validateFilename(filename: string): string {
    const sanitizedFilename = path.basename(filename);

    if (!sanitizedFilename.trim()) {
      throw new AppError(
        "Invalid filename",
        400,
        "INVALID_FILENAME"
      );
    }

    if (
      sanitizedFilename === "." ||
      sanitizedFilename === ".."
    ) {
      throw new AppError(
        "Invalid filename",
        400,
        "INVALID_FILENAME"
      );
    }

    return sanitizedFilename;
  }

  validateFileType(filename: string): void {
    const extension = path
      .extname(filename)
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      throw new AppError(
        "Unsupported file type",
        400,
        "INVALID_FILE_TYPE"
      );
    }
  }

  validate(filename: string): string {
    const sanitizedFilename =
      this.validateFilename(filename);

    this.validateFileType(sanitizedFilename);

    return sanitizedFilename;
  }
}

export const uploadValidator =
  new UploadValidator();