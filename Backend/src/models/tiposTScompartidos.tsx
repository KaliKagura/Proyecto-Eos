export type ColumnMapping = {
  date: string;
  sales: string;
  quantity?: string;
  product?: string;
};

export type ValidationIssue = {
  level: "info" | "warn" | "error";
  code: string;
  detail?: string;
  pct?: number;
  count?: number;
};

export type PreviewRow = Record<string, string | number | null>;

export type DetectionResult = {
  suggestedMapping: Partial<ColumnMapping>;
  issues: ValidationIssue[];
  preview: PreviewRow[];
  rowCount: number;
};