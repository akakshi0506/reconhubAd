import path from "node:path";

import { storageService } from "../../core/storage/storage.service";
import { reconciliationReader } from "./reader";

async function main() {
  const filePath = path.join(
    storageService.getStorageRoot(),
    "6968bce3-5281-476e-9e1f-ce397b165c9b",
    "uploads",
    "SAP (1).xlsx"
  );

  console.log("Reading:", filePath);

  const records =
    await reconciliationReader.readWorkbook(
      filePath,
      "SAP"
    );

  console.dir(records, {
    depth: null,
  });
}

main().catch(console.error);