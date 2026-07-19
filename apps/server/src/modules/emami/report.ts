import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";

import { storageService } from "../../core/storage/storage.service";
import type { EmamiRecord } from "./types";

export class EmamiReportService {
  async generate(jobId: string, records: EmamiRecord[]) {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Emami Output");

    sheet.columns = [
      { header: "Display Order", key: "displayOrder", width: 25 },
      { header: "UC Qty", key: "ucQuantity", width: 12 },
      { header: "Total Price", key: "totalPrice", width: 15 },
      { header: "COD", key: "cod", width: 10 },
      { header: "PO Number", key: "poNumber", width: 25 },
      { header: "SAP Qty", key: "sapQuantity", width: 12 },
      { header: "Net Value", key: "netValue", width: 15 },
      { header: "Net Tax", key: "netTax", width: 15 },
    ];

    // Header formatting
    sheet.getRow(1).font = {
      bold: true,
    };

    sheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    sheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    for (const record of records) {
      sheet.addRow(record);
    }

    const outputDir = path.join(
      storageService.getStorageRoot(),
      jobId,
      "output",
    );

    fs.mkdirSync(outputDir, {
      recursive: true,
    });

    const outputPath = path.join(outputDir, "Emami_Output.xlsx");

    await workbook.xlsx.writeFile(outputPath);

    return outputPath;
  }
}

export const emamiReportService = new EmamiReportService();
