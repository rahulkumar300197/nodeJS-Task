import stocks from '../dataStore/stock.json';
import transactions from '../dataStore/transactions.json';
import { StockType } from '../interfaces/stock.type';
import { TransactionType } from '../interfaces/transaction.type';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';

export class InventoryService {
  async getStocksBySku(sku: string): Promise<{ sku: string; qty: number }> {
    const stocks = this.getInitialStocks(sku);
    return this.applyTransactionsOnStock(stocks);
  }

  private getInitialStocks(sku: string): StockType {
    let stock = (stocks as Array<StockType>).filter(
      (stock) => stock.sku === sku,
    );
    if (!stock.length) {
      stock = [{ sku, stock: 0 }];
    }
    return stock[0];
  }

  private applyTransactionsOnStock({ sku, stock: qty }: StockType): {
    sku: string;
    qty: number;
  } {
    const finalStock: { sku: string; qty: number } = {
      sku,
      qty,
    };
    for (const transaction of transactions as Array<TransactionType>) {
      if (transaction.sku === sku) {
        if (transaction.type === TransactionTypeEnum.ORDER) {
          finalStock.qty -= transaction.qty;
        } else {
          finalStock.qty += transaction.qty;
        }
      }
    }
    if (finalStock.qty <= 0) {
      throw new Error('SKU Not Found');
    }
    return finalStock;
  }
}
