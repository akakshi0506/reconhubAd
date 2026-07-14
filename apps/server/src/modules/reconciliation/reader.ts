import ExcelJS from "exceljs";

import type { ReconRecord } from "./types";

export class ReconciliationReader {
  async readWorkbook(
    filePath: string,
    source: "UC" | "SAP"
  ): Promise<ReconRecord[]> {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      throw new Error("Worksheet not found");
    }

    const headers: string[] = [];

    worksheet.getRow(1).eachCell((cell) => {
      headers.push(
        String(cell.value ?? "")
          .trim()
          .toLowerCase()
      );
    });

    const records: ReconRecord[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }

      const values: Record<string, unknown> = {};

      headers.forEach((header, index) => {
        values[header] =
          row.getCell(index + 1).value;
      });

      records.push({
        ucId: String(
          values["uc_id"] ??
            values["uc id"] ??
            ""
        ),

        amount: Number(
          values["amount"] ?? 0
        ),

        status: String(
          values["status"] ?? ""
        ),

        source,

        raw: values,
      });
    });

    return records;
  }
}

export const reconciliationReader =
  new ReconciliationReader();