import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { VtexClient } from '../../pkg/vtexClient/vtexClient.js';
import { VtexCatalogService } from '../../src/services/vtex/catalog/catalogService.js';
import {
  CreateBrandInput as UseCaseCreateBrandInput,
  CreateBrandUseCase,
} from '../../src/useCases/catalog/brand.js';
import { env } from '../config.js';

const createBrandInputSchema = z.object({
  name: z.string(),
});

type CreateBrandInput = z.infer<typeof createBrandInputSchema>;

export function createBrandHandler(app: FastifyInstance) {
  app.post('/brand/createBrand', async (req, res) => {
    try {
      const baseUrl = env.vtexBaseUrl.get();
      const appKey = env.vtexAppKey.get();
      const appToken = env.vtexAppToken.get();

      const vtexClient = new VtexClient({ baseUrl, appKey, appToken });
      const vtexCatalogService = new VtexCatalogService(vtexClient);
      const createBrandUseCase = new CreateBrandUseCase(vtexCatalogService);

      const rawBody = req.body;

      const input = createBrandInputSchema.parse(rawBody);

      const newBrand = await createBrandUseCase.createBrand(
        toUseCaseInput(input)
      );

      return newBrand;
    } catch (error) {
      throw error;
    }
  });
}

function toUseCaseInput(input: CreateBrandInput): UseCaseCreateBrandInput {
  return {
    name: input.name,
  };
}
