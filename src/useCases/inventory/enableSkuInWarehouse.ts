import { InventoryService } from '../../services/vtex/inventory/inventoryService.js'

export type EnableInventoryInput = {
  quantity: number | null
  warehouseId: string
  skuId: number
}

export type EnableInventoryOutput = void

export class EnableInventoryUseCase {
  constructor(
    private inventoryService: InventoryService,
  ) {}

  async enableInventory(input: EnableInventoryInput): Promise<EnableInventoryOutput> {
    return this.inventoryService.enableSkuInWarehouse(input)
  }
}
