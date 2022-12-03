import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService = new InventoryService();

  it('getStocksBySku Test Positive', async () => {
    const { sku, qty } = await service.getStocksBySku('LTV719449/39/39');
    console.log(sku, qty);
    expect(sku).toEqual('LTV719449/39/39');
    expect(qty).toEqual(8510);
  });

  it('getStocksBySku Test Negative', async () => {
    const { sku, qty } = await service.getStocksBySku('wr9wf9w9w9w');
    console.log(sku, qty);
    expect(sku).toEqual('LTV719449/39/39');
    expect(qty).toEqual(1323);
  });
});
