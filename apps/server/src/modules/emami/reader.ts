import ExcelJS from "exceljs";

import { SapRecord, UcRecord } from "./types";

export class EmamiReader {
  async readUcWorkbook(filePath: string): Promise<UcRecord[]> {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      throw new Error("UC worksheet not found");
    }

    const headers: string[] = [];

    worksheet.getRow(1).eachCell((cell) => {
      headers.push(
        String(cell.value ?? "")
          .trim()
          .toLowerCase(),
      );
    });

    const records: UcRecord[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const values: Record<string, unknown> = {};

      headers.forEach((header, index) => {
        values[header] = row.getCell(index + 1).value;
      });

      records.push({
        displayOrder: String(values["display order code"] ?? ""),

        quantity: Number(values["qty"] ?? 0),

        totalPrice: Number(values["total price"] ?? 0),

        cod: Number(values["cod"] ?? 0),
      });
    });

    return records;
  }

  async readSapWorkbook(filePath: string): Promise<SapRecord[]> {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      throw new Error("SAP worksheet not found");
    }

    const headers: string[] = [];

    worksheet.getRow(1).eachCell((cell) => {
      headers.push(
        String(cell.value ?? "")
          .trim()
          .toLowerCase(),
      );
    });

    const records: SapRecord[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const values: Record<string, unknown> = {};

      headers.forEach((header, index) => {
        values[header] = row.getCell(index + 1).value;
      });

      records.push({
        poNumber: String(values["po number"] ?? ""),

        quantity: Number(values["quantity in sku"] ?? 0),

        netValue: Number(values["net value in inr"] ?? 0),

        netTax: Number(values["net tax amount"] ?? 0),
      });
    });

    return records;
  }
}

export const emamiReader = new EmamiReader();
