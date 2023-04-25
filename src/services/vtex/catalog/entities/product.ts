import { z } from 'zod';
import { Product } from '../../../../models/product.js';

export const VtexProductSchema = z.object({
  Id: z.number(),
  Name: z.string(),
  DepartmentId: z.number(),
  CategoryId: z.number(),
  BrandId: z.number(),
  LinkId: z.string(),
  RefId: z.string().nullable(),
  IsVisible: z.boolean(),
  Description: z.string().nullable(),
  DescriptionShort: z.string().nullable(),
  ReleaseDate: z.string().nullable(),
  KeyWords: z.string().nullable(),
  Title: z.string().nullable(),
  IsActive: z.boolean(),
  TaxCode: z.string().nullable(),
  MetaTagDescription: z.string().nullable(),
  ShowWithoutStock: z.boolean(),
  Score: z.number().nullable(),
});

type VtexProduct = z.infer<typeof VtexProductSchema>;

export function toModelProduct(p: VtexProduct): Product {
  return {
    id: p.Id,
    brandId: p.BrandId,
    categoryId: p.CategoryId,
    departmentId: p.DepartmentId,
    isActive: p.IsActive,
    isVisible: p.IsVisible,
    keyWords: p.KeyWords,
    linkId: p.LinkId,
    metaTagDescription: p.MetaTagDescription,
    name: p.Name,
    refId: p.RefId,
    releaseDate: p.ReleaseDate,
    score: p.Score,
    description: p.Description,
    descriptionShort: p.DescriptionShort,
    showWithoutStock: p.ShowWithoutStock,
    taxCode: p.TaxCode,
    title: p.Title,
  };
}
