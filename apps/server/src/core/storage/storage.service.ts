import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const STORAGE_ROOT = path.resolve(
  currentDirectory,
  "../../../../../storage/jobs"
);

export class StorageService {
  private readonly storageRoot = STORAGE_ROOT;

  async createJobWorkspace(
    jobId: string
  ): Promise<void> {
    const jobDirectory = path.join(
      this.storageRoot,
      jobId
    );

    const directories = [
      jobDirectory,
      path.join(jobDirectory, "uploads"),
      path.join(jobDirectory, "processed"),
      path.join(jobDirectory, "output"),
      path.join(jobDirectory, "reports"),
    ];

    await Promise.all(
      directories.map((directory) =>
        fs.mkdir(directory, {
          recursive: true,
        })
      )
    );
  }

  async saveMetadata(
    jobId: string,
    metadata: unknown
  ): Promise<void> {
    const metadataPath = path.join(
      this.storageRoot,
      jobId,
      "metadata.json"
    );

    await fs.writeFile(
      metadataPath,
      JSON.stringify(metadata, null, 2),
      "utf-8"
    );
  }

  async uploadExists(
    jobId: string,
    filename: string
  ): Promise<boolean> {
    const filePath = path.join(
      this.storageRoot,
      jobId,
      "uploads",
      filename
    );

    try {
      await fs.access(filePath);

      return true;
    } catch {
      return false;
    }
  }

  async saveUploadStream(
    jobId: string,
    filename: string,
    stream: NodeJS.ReadableStream
  ): Promise<string> {
    const uploadDirectory = path.join(
      this.storageRoot,
      jobId,
      "uploads"
    );

    await fs.mkdir(uploadDirectory, {
      recursive: true,
    });

    const destination = path.join(
      uploadDirectory,
      filename
    );

    await pipeline(
      stream,
      createWriteStream(destination)
    );

    return destination;
  }

  async getUploadFileSize(
    jobId: string,
    filename: string
  ): Promise<number> {
    const filePath = path.join(
      this.storageRoot,
      jobId,
      "uploads",
      filename
    );

    const stats = await fs.stat(filePath);

    return stats.size;
  }

  async readUploadMetadata<T>(
    jobId: string
  ): Promise<T | null> {
    const metadataPath = path.join(
      this.storageRoot,
      jobId,
      "upload-metadata.json"
    );

    try {
      const content = await fs.readFile(
        metadataPath,
        "utf-8"
      );

      return JSON.parse(content) as T;
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;

      if (nodeError.code === "ENOENT") {
        return null;
      }

      throw error;
    }
  }

  async saveUploadMetadata(
    jobId: string,
    metadata: unknown
  ): Promise<void> {
    const metadataPath = path.join(
      this.storageRoot,
      jobId,
      "upload-metadata.json"
    );

    await fs.writeFile(
      metadataPath,
      JSON.stringify(metadata, null, 2),
      "utf-8"
    );
  }
}

export const storageService =
  new StorageService();