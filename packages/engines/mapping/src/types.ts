export type WorkflowType =
  | "UC_SAP"
  | "UC_PP_WH";

export type WorkbookRole =
  | "UC"
  | "SAP"
  | "PP"
  | "WH";

export type RawRecord = Record<
  string,
  string | number | boolean | null
>;

export type CanonicalRecord = Record<
  string,
  string | number | boolean | null
>;

export interface MappingRequest {
  workflow: WorkflowType;

  role: WorkbookRole;

  records: RawRecord[];
}

export interface MappingError {
  row: number;

  field: string;

  message: string;
}

export interface MappingResult {
  valid: boolean;

  records: CanonicalRecord[];

  errors: MappingError[];
}