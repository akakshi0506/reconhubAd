import path from "node:path";

import { storageService } from "../../core/storage/storage.service";

import { reconciliationReader } from "./reader";
import { reconciliationRepository } from "./repository";
import { reportService } from "../report/service";
import type {
  ReconciliationResult,
} from "./types";

export class ReconciliationService {
  async reconcileJob(
    jobId: string
  ): Promise<ReconciliationResult> {
    const root =
      storageService.getStorageRoot();

    const ucFile = path.join(
      root,
      jobId,
      "uploads",
      "UC (1).xlsx"
    );

    const sapFile = path.join(
      root,
      jobId,
      "uploads",
      "SAP (1).xlsx"
    );

    const uc =
      await reconciliationReader.readWorkbook(
        ucFile,
        "UC"
      );

    const sap =
      await reconciliationReader.readWorkbook(
        sapFile,
        "SAP"
      );

    const matched = [];
    const mismatched = [];
    const missingInSap = [];
    const missingInUc = [];

    const sapMap = new Map(
      sap.map((record) => [
        record.ucId,
        record,
      ])
    );

    const visited = new Set<string>();

    for (const ucRecord of uc) {
      const sapRecord = sapMap.get(
        ucRecord.ucId
      );

      if (!sapRecord) {
        missingInSap.push(ucRecord);

        continue;
      }

      visited.add(ucRecord.ucId);

      if (
        ucRecord.amount === sapRecord.amount &&
        ucRecord.status === sapRecord.status
      ) {
        matched.push({
          uc: ucRecord,
          sap: sapRecord,
        });
      } else {
        mismatched.push({
          uc: ucRecord,
          sap: sapRecord,
          differences: [],
        });
      }
    }

    for (const sapRecord of sap) {
      if (
        !visited.has(sapRecord.ucId)
      ) {
        missingInUc.push(sapRecord);
      }
    }

    const result: ReconciliationResult = {
      totalUc: uc.length,
      totalSap: sap.length,
      matched,
      mismatched,
      missingInSap,
      missingInUc,
    };

    const summary = {
        totalUc: result.totalUc,
        totalSap: result.totalSap,
        matched: result.matched.length,
        mismatched: result.mismatched.length,
        missingInSap: result.missingInSap.length,
        missingInUc: result.missingInUc.length,
    };

    await reconciliationRepository.save(
      jobId,
      result
    );

    // await reconciliationRepository.save(jobId, {
    //     summary,
    //     result,
    // });
    
    await reportService.generate(
        jobId,
        result
    );
    return result;
  }
}

export const reconciliationService =
  new ReconciliationService();