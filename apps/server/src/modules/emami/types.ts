export interface UcRecord {
  displayOrder: string;
  quantity: number;
  totalPrice: number;
  cod: number;
}

export interface SapRecord {
  poNumber: string;
  quantity: number;
  netValue: number;
  netTax: number;
}

export interface EmamiRecord {
  displayOrder: string;
  ucQuantity: number;
  totalPrice: number;
  cod: number;

  poNumber: string;
  sapQuantity: number;
  netValue: number;
  netTax: number;
}
