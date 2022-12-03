import { TransactionTypeEnum } from '../enums/transaction.type.enum';

export interface TransactionType {
  sku: string;
  type: TransactionTypeEnum;
  qty: number;
}
