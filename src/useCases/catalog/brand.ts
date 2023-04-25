import { Brand } from '../../models/brand.js';
import { CatalogService } from '../../services/vtex/catalog/catalogService.js';

export type CreateBrandInput = {
  name: string;
};

export type CreateBrandOutput = Brand;

export class CreateBrandUseCase {
  constructor(private catalogService: CatalogService) {}

  async createBrand(input: CreateBrandInput): Promise<CreateBrandOutput> {
    return this.catalogService.createBrand(input);
  }
}
