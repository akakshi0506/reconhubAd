import fs from "node:fs/promises";
import path from "node:path";

export class StorageService {
  private readonly storageRoot = path.resolve(
    process.cwd(),
    "../../storage/jobs"
  );

  async createJobWorkspace(jobId: string) {
    const root = path.join(this.storageRoot, jobId);

    const directories = [
      "uploads",
      "processed",
      "output",
      "reports",
    ];

    for (const dir of directories) {
      await fs.mkdir(path.join(root, dir), {
        recursive: true,
      });
    }

    return root;
  }

  async saveMetadata(
    jobId: string,
    metadata: unknown
  ) {
    const file = path.join(
      this.storageRoot,
      jobId,
      "metadata.json"
    );

    await fs.writeFile(
      file,
      JSON.stringify(metadata, null, 2)
    );
  }

  async saveUpload(
    jobId: string,
    filename: string,
    buffer: Buffer
    ) {
        const filePath = path.join(
            this.storageRoot,
            jobId,
            "uploads",
            filename
        );

        await fs.writeFile(filePath, buffer);

        return filePath;
    }
}

export const storageService = new StorageService();