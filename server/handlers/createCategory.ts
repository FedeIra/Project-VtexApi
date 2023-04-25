import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { VtexClient } from '../../pkg/vtexClient/vtexClient.js';
import { VtexCatalogService } from '../../src/services/vtex/catalog/catalogService.js';
import {
  CreateCategoryInput as UseCaseCreateCategoryInput,
  CreateCategoryUseCase,
} from '../../src/useCases/catalog/category.js';
import { env } from '../config.js';

const createCategoryInputSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  parentCategoryId: z.number().optional(),
});

type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export function createCategoryHandler(app: FastifyInstance) {
  app.post('/category/createCategory', async (req, res) => {
    try {
      const baseUrl = env.vtexBaseUrl.get();
      const appKey = env.vtexAppKey.get();
      const appToken = env.vtexAppToken.get();

      const vtexClient = new VtexClient({ baseUrl, appKey, appToken });
      const vtexCatalogService = new VtexCatalogService(vtexClient);
      const createCategoryUseCase = new CreateCategoryUseCase(
        vtexCatalogService
      );

      const rawBody = req.body;
      const input = createCategoryInputSchema.parse(rawBody);

      const category = await createCategoryUseCase.createCategory(
        toUseCaseInput(input)
      );

      return category;
    } catch (error) {
      throw error;
    }
  });
}

function toUseCaseInput(
  input: CreateCategoryInput
): UseCaseCreateCategoryInput {
  return {
    name: input.name,
    parentCategoryId: input.parentCategoryId,
    description: input.description,
    keywords: input.keywords,
    title: input.title,
  };
}
