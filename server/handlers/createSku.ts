import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { VtexClient } from '../../pkg/vtexClient/vtexClient.js';
import { VtexCatalogService } from '../../src/services/vtex/catalog/catalogService.js';
import {
  CreateSkuInput as UseCaseCreateSkuInput,
  CreateSkuUseCase,
} from '../../src/useCases/catalog/sku.js';
import { env } from '../config.js';

const createSkuInputSchema = z.object({
  name: z.string(),
  productId: z.number(),
  refId: z.string().optional(),
  image: z
    .object({
      title: z.string(),
      url: z.string().url(),
    })
    .optional(),
});

type CreateSkuInput = z.infer<typeof createSkuInputSchema>;

export function createSkuHandler(app: FastifyInstance) {
  app.post('/sku/createSku', async (req, res) => {
    try {
      const baseUrl = env.vtexBaseUrl.get();
      const appKey = env.vtexAppKey.get();
      const appToken = env.vtexAppToken.get();

      const vtexClient = new VtexClient({ baseUrl, appKey, appToken });
      const vtexCatalogService = new VtexCatalogService(vtexClient);
      const createSkuUseCase = new CreateSkuUseCase(vtexCatalogService);

      const rawBody = req.body;

      const input = createSkuInputSchema.parse(rawBody);

      const newSku = await createSkuUseCase.createSkuId(toUseCaseInput(input));

      return newSku;
    } catch (error) {
      throw error;
    }
  });
}

function toUseCaseInput(input: CreateSkuInput): UseCaseCreateSkuInput {
  return {
    name: input.name,
    productId: input.productId,
    refId: input.refId,
    image: input.image,
  };
}
