import { Sku } from '../../models/sku.js';
import { CatalogService } from '../../services/vtex/catalog/catalogService.js';

export type CreateSkuInput = {
  productId: number;
  name: string;
  refId?: string;
  image?: {
    title: string;
    url: string;
  };
};
export type CreateSkuOutput = Sku;

export class CreateSkuUseCase {
  constructor(private catalogService: CatalogService) {}

  async createSkuId(input: CreateSkuInput): Promise<CreateSkuOutput> {
    return this.catalogService.createSku(input);
  }
}
