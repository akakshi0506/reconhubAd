export interface ReconRecord {
  ucId: string;

  amount: number;

  status: string;

  source: "UC" | "SAP";

  raw: Record<string, unknown>;
}

export interface MatchPair {
  uc: ReconRecord;

  sap: ReconRecord;
}

export interface MismatchPair {
  uc: ReconRecord;

  sap: ReconRecord;

  differences: string[];
}

export interface ReconciliationResult {
  totalUc: number;

  totalSap: number;

  matched: MatchPair[];

  mismatched: MismatchPair[];

  missingInUc: ReconRecord[];

  missingInSap: ReconRecord[];
}

export interface ReconciliationSummary {
  totalUc: number;

  totalSap: number;

  matched: number;

  mismatched: number;

  missingInUc: number;

  missingInSap: number;
}