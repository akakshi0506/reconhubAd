import fs from "node:fs/promises";
import path from "node:path";

import ExcelJS from "exceljs";

import { storageService } from "../../core/storage/storage.service";
import type { ReconciliationResult } from "../reconciliation/types";

export class ReportService {
  async generate(
    jobId: string,
    result: ReconciliationResult
  ): Promise<string> {
    const workbook = new ExcelJS.Workbook();

    //
    // Summary Sheet
    //
    const summary = workbook.addWorksheet("Summary");

    summary.columns = [
      { header: "Metric", width: 30 },
      { header: "Value", width: 15 },
    ];

    summary.addRows([
      ["Total UC", result.totalUc],
      ["Total SAP", result.totalSap],
      ["Matched", result.matched.length],
      ["Mismatched", result.mismatched.length],
      ["Missing In SAP", result.missingInSap.length],
      ["Missing In UC", result.missingInUc.length],
    ]);

    //
    // Matched
    //
    const matched = workbook.addWorksheet("Matched");

    matched.columns = [
      { header: "UC ID", key: "ucId", width: 25 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 20 },
    ];

    result.matched.forEach((row) => {
      matched.addRow({
        ucId: row.uc.ucId,
        amount: row.uc.amount,
        status: row.uc.status,
      });
    });

    //
    // Mismatched
    //
    const mismatch = workbook.addWorksheet("Mismatched");

    mismatch.columns = [
      { header: "UC ID", width: 20 },
      { header: "UC Amount", width: 15 },
      { header: "SAP Amount", width: 15 },
      { header: "UC Status", width: 20 },
      { header: "SAP Status", width: 20 },
    ];

    result.mismatched.forEach((row) => {
      mismatch.addRow([
        row.uc.ucId,
        row.uc.amount,
        row.sap.amount,
        row.uc.status,
        row.sap.status,
      ]);
    });

    //
    // Missing In SAP
    //
    const missingSap =
      workbook.addWorksheet("Missing In SAP");

    missingSap.columns = [
      { header: "UC ID", width: 20 },
      { header: "Amount", width: 15 },
      { header: "Status", width: 20 },
    ];

    result.missingInSap.forEach((row) => {
      missingSap.addRow([
        row.ucId,
        row.amount,
        row.status,
      ]);
    });

    //
    // Missing In UC
    //
    const missingUc =
      workbook.addWorksheet("Missing In UC");

    missingUc.columns = [
      { header: "UC ID", width: 20 },
      { header: "Amount", width: 15 },
      { header: "Status", width: 20 },
    ];

    result.missingInUc.forEach((row) => {
      missingUc.addRow([
        row.ucId,
        row.amount,
        row.status,
      ]);
    });

    const reportPath = path.join(
      storageService.getStorageRoot(),
      jobId,
      "reports",
      "Reconciliation_Report.xlsx"
    );

    await fs.mkdir(path.dirname(reportPath), {
      recursive: true,
    });

    await workbook.xlsx.writeFile(reportPath);

    return reportPath;
  }
}

export const reportService =
  new ReportService();