import fs from "node:fs/promises";
import path from "node:path";

import { storageService } from "../../core/storage/storage.service";
import type { ReconciliationResult } from "./types";

export class ReconciliationRepository {
  async save(
    jobId: string,
    result: ReconciliationResult
  ) {
    const filePath = path.join(
      storageService.getStorageRoot(),
      jobId,
      "reconciliation-result.json"
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(result, null, 2),
      "utf8"
    );
  }
}

export const reconciliationRepository =
  new ReconciliationRepository();