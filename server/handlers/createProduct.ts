import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { VtexClient } from '../../pkg/vtexClient/vtexClient.js';
import { VtexCatalogService } from '../../src/services/vtex/catalog/catalogService.js';
import {
  CreateProductInput as UseCaseCreateProductInput,
  CreateProductUseCase,
} from '../../src/useCases/catalog/product.js';
import { env } from '../config.js';

const createProductInputSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  brandId: z.number(),
});

type CreateProductInput = z.infer<typeof createProductInputSchema>;

export function createProductHandler(app: FastifyInstance) {
  app.post('/product/createProduct', async (req, res) => {
    try {
      const baseUrl = env.vtexBaseUrl.get();
      const appKey = env.vtexAppKey.get();
      const appToken = env.vtexAppToken.get();

      const vtexClient = new VtexClient({ baseUrl, appKey, appToken });
      const vtexCatalogService = new VtexCatalogService(vtexClient);
      const createProductUseCase = new CreateProductUseCase(vtexCatalogService);

      const rawBody = req.body;

      const input = createProductInputSchema.parse(rawBody);

      const newProduct = await createProductUseCase.createProduct(
        toUseCaseInput(input)
      );

      return newProduct;
    } catch (error) {
      throw error;
    }
  });
}

function toUseCaseInput(input: CreateProductInput): UseCaseCreateProductInput {
  return {
    name: input.name,
    categoryId: input.categoryId,
    brandId: input.brandId,
  };
}
