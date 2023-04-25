import { Product } from '../../models/product.js'
import { CatalogService } from '../../services/vtex/catalog/catalogService.js'

export type CreateProductInput = {
  name: string;
  categoryId: number;
  brandId: number;
};

export type CreateProductOutput = Product;

export class CreateProductUseCase {
  constructor(private catalogService: CatalogService) {}

  async createProduct(input: CreateProductInput): Promise<CreateProductOutput> {
    return this.catalogService.createProduct(input);
  }
}
