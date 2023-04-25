import { VtexClient } from '../../../../pkg/vtexClient/vtexClient.js'
import { EnableInventoryInput, EnableInventoryOutput } from '../../../useCases/inventory/enableSkuInWarehouse.js'
import { VtexEnableInventoryPayload } from './endpoints/createInventory.js'

export interface InventoryService {
  enableSkuInWarehouse(input: EnableInventoryInput): EnableInventoryOutput
}

export class VtexInventoryService implements InventoryService {
  constructor(private client: VtexClient) {}

  async enableSkuInWarehouse(input: EnableInventoryInput): Promise<void> {
    const { warehouseId, skuId, quantity } = input;
    const payload: VtexEnableInventoryPayload = {
      UnlimitedQuantity: quantity === null,
      Quantity: quantity,
    };

    await this.client.send({
      method: 'put',
      path: `logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}`,
      payload,
    });
  }
}