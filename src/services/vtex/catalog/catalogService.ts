import { VtexClient } from '../../../../pkg/vtexClient/vtexClient.js';
import { Product } from '../../../models/product.js';
import { CreateProductInput } from '../../../useCases/catalog/product.js';
import {
  CreateProductPayload,
  createProductResponseSchema,
} from './endpoints/createProduct.js';
import { toModelProduct } from './entities/product.js';
import { Brand } from '../../../models/brand.js';
import { CreateBrandInput } from '../../../useCases/catalog/brand.js';
import {
  CreateBrandPayload,
  createBrandResponseSchema,
  toModelBrandBad,
} from './endpoints/createBrand.js';
import { toModelBrand } from './entities/brand.js';
import {
  CreateCategoryPayload,
  createCategoryResponseSchema,
} from './endpoints/createCategory.js';
import { Category } from '../../../models/category.js';
import { toModelCategory } from './entities/category.js';
import { CreateCategoryInput } from '../../../useCases/catalog/category.js';
import {
  CreateSkuPayload,
  createSkuResponseSchema,
} from './endpoints/createSkuId.js';
import { toModelSku } from './entities/sku.js';
import { CreateSkuInput } from '../../../useCases/catalog/sku.js';
import { CreateSkusImagePayload } from './endpoints/createSkuImage.js';
import { updateProductResponseSchema } from './endpoints/updateProduct.js';
import { Sku } from '../../../models/sku.js';

export interface CatalogService {
  createProduct(input: CreateProductInput): Promise<Product>;
  createBrand(input: CreateBrandInput): Promise<Brand>;
  createCategory(params: CreateCategoryInput): Promise<Category>;
  createSku(input: CreateSkuInput): Promise<Sku>;
}

export class VtexCatalogService implements CatalogService {
  constructor(private client: VtexClient) {}

  async createProduct(params: CreateProductInput): Promise<Product> {
    const { name, categoryId, brandId } = params;

    const createPayload: CreateProductPayload = {
      Name: name,
      CategoryId: categoryId,
      BrandId: brandId,
    };

    const createdProductRaw = await this.client.send({
      method: 'post',
      path: 'catalog/pvt/product',
      payload: createPayload,
    });

    const createdProduct = createProductResponseSchema.parse(createdProductRaw);
    createdProduct.IsActive = true;
    createdProduct.IsVisible = true;

    const raw = await this.client.send({
      method: 'put',
      path: `catalog/pvt/product/${createdProduct.Id}`,
      payload: createdProduct,
    });

    const response = updateProductResponseSchema.parse(raw);
    const updatedProduct = toModelProduct(response);

    return updatedProduct;
  }

  async createBrand(params: CreateBrandInput): Promise<Brand> {
    const { name } = params;
    const payload: CreateBrandPayload = {
      Name: name,
      Active: true,
    };

    let raw;

    try {
      raw = await this.client.send({
        method: 'post',
        path: 'catalog/pvt/brand',
        payload,
      });
    } catch (error) {
      throw error;
    }

    const response = createBrandResponseSchema.parse(raw);
    const newBrand = toModelBrandBad(response);
    return newBrand;
  }

  async createCategory(params: CreateCategoryInput): Promise<Category> {
    const { name, description, keywords, title, parentCategoryId } = params;
    const payload: CreateCategoryPayload = {
      Name: name,
      FatherCategoryId: parentCategoryId ?? null,
      Title: title,
      ShowBrandFilter: true,
      ShowInStoreFront: true,
      IsActive: true,
      ActiveStoreFrontLink: true,
      Description: description,
      KeyWords: keywords.join(','),
      Score: null,
      StockKeepingUnitSelectionMode: 'SPECIFICATION',
      GlobalCategoryId: 1,
    };

    const raw = await this.client.send({
      method: 'post',
      path: 'catalog/pvt/category',
      payload,
    });

    const response = createCategoryResponseSchema.parse(raw);
    const category = toModelCategory(response);

    return category;
  }

  async createSku(input: CreateSkuInput): Promise<Sku> {
    const payload: CreateSkuPayload = {
      ProductId: input.productId,
      Name: input.name,
      PackagedHeight: 1,
      PackagedLength: 1,
      PackagedWidth: 1,
      PackagedWeightKg: 1,
      ActivateIfPossible: true,
      RefId: input.refId ?? null,
    };

    const rawSku = await this.client.send({
      method: 'post',
      path: 'catalog/pvt/stockkeepingunit',
      payload,
    });

    const rawCreatedSku = createSkuResponseSchema.parse(rawSku);

    rawCreatedSku.IsActive = true;

    const createdSku = toModelSku(rawCreatedSku);

    if (input.image !== undefined) {
      const { title, url } = input.image;
      const skuId = createdSku.id;

      const payload: CreateSkusImagePayload = {
        Name: title,
        Url: url,
        SkuId: skuId,
      };

      await this.client.send({
        method: 'post',
        path: `catalog/pvt/stockkeepingunit/${createdSku.id}/file`,
        payload,
      });
    }

    return createdSku;
  }
}
