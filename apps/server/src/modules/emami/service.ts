import fs from "node:fs";
import path from "node:path";

import { storageService } from "../../core/storage/storage.service";

import { emamiReader } from "./reader";
import type { EmamiRecord, SapRecord, UcRecord } from "./types";

export class EmamiService {
  async process(jobId: string): Promise<EmamiRecord[]> {
    const root = storageService.getStorageRoot();

    const uploadDir = path.join(root, jobId, "uploads");

    const files = fs.readdirSync(uploadDir);

    const ucFile = files.find((file) => file.toLowerCase().includes("uc"));

    const sapFile = files.find((file) => file.toLowerCase().includes("sap"));

    if (!ucFile || !sapFile) {
      throw new Error("UC or SAP workbook not found.");
    }

    const ucRecords: UcRecord[] = await emamiReader.readUcWorkbook(
      path.join(uploadDir, ucFile),
    );

    const sapRecords: SapRecord[] = await emamiReader.readSapWorkbook(
      path.join(uploadDir, sapFile),
    );

    const sapMap = new Map(
      sapRecords.map((record) => [record.poNumber, record]),
    );

    const result: EmamiRecord[] = [];

    for (const uc of ucRecords) {
      const sap = sapMap.get(uc.displayOrder);

      if (!sap) {
        continue;
      }

      result.push({
        displayOrder: uc.displayOrder,

        ucQuantity: uc.quantity,

        totalPrice: uc.totalPrice,

        cod: uc.cod,

        poNumber: sap.poNumber,

        sapQuantity: sap.quantity,

        netValue: sap.netValue,

        netTax: sap.netTax,
      });
    }

    return result;
  }
}

export const emamiService = new EmamiService();
