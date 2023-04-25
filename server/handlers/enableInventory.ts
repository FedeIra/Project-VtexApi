import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { VtexClient } from '../../pkg/vtexClient/vtexClient.js';
import { VtexInventoryService } from '../../src/services/vtex/inventory/inventoryService.js';
import {
  EnableInventoryInput as UseCaseEnableInventoryInput,
  EnableInventoryUseCase,
} from '../../src/useCases/inventory/enableSkuInWarehouse.js';
import { env } from '../config.js';

const enableInventoryInputSchema = z.object({
  quantity: z.number().nullable(),
  warehouseId: z.string(),
  skuId: z.number(),
});

type EnableInventoryInput = z.infer<typeof enableInventoryInputSchema>;

export function enableInventoryHandler(app: FastifyInstance) {
  app.post('/inventory/enableSkuInWarehouse', async (req, res) => {
    try {
      const baseUrl = env.vtexBaseUrl.get();
      const appKey = env.vtexAppKey.get();
      const appToken = env.vtexAppToken.get();

      const vtexClient = new VtexClient({ baseUrl, appKey, appToken });
      const vtexCatalogService = new VtexInventoryService(vtexClient);
      const enableInventoryUseCase = new EnableInventoryUseCase(
        vtexCatalogService
      );

      const rawBody = req.body;
      const input = enableInventoryInputSchema.parse(rawBody);

      const inventory = await enableInventoryUseCase.enableInventory(
        toUseCaseInput(input)
      );

      return inventory;
    } catch (error) {
      throw error;
    }
  });
}

function toUseCaseInput(
  input: EnableInventoryInput
): UseCaseEnableInventoryInput {
  return {
    quantity: input.quantity,
    skuId: input.skuId,
    warehouseId: input.warehouseId,
  };
}
