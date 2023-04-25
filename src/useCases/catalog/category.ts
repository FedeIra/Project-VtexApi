import { Category } from '../../models/category.js';
import { CatalogService } from '../../services/vtex/catalog/catalogService.js';

export type CreateCategoryInput = {
  name: string;
  keywords: string[];
  title: string;
  description: string;
  parentCategoryId?: number;
};
export type CreateCategoryOutput = Category;

export class CreateCategoryUseCase {
  constructor(private catalogService: CatalogService) {}

  async createCategory(
    input: CreateCategoryInput
  ): Promise<CreateCategoryOutput> {
    return this.catalogService.createCategory(input);
  }
}
