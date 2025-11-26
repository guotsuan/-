export interface BudgetResult {
  total: number;
  equipment: number;
  maxIndirect: number;
  direct: number;
  otherDirect: number; // Direct - Equipment
  effectiveBase: number; // Total - Equipment
}

export enum CalculationBracket {
  LOW = 'LOW', // <= 650 (Total - Equipment)
  MEDIUM = 'MEDIUM', // 650 < x <= 1275
  HIGH = 'HIGH', // > 1275
}

export interface ChartData {
  name: string;
  value: number;
  fill: string;
}