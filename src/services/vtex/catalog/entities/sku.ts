import { z } from 'zod';
import { Sku } from '../../../../models/sku.js';

export const VtexSkuSchema = z.object({
  ProductId: z.number(),
  Name: z.string(),
  PackagedHeight: z.number().nullable(),
  PackagedLength: z.number().nullable(),
  PackagedWidth: z.number().nullable(),
  PackagedWeightKg: z.number().nullable(),
  Id: z.number(),
  IsActive: z.boolean(),
  ActivateIfPossible: z.boolean(),
  RefId: z.string().nullable(),
});

type VtexSku = z.infer<typeof VtexSkuSchema>;

export function toModelSku(p: VtexSku): Sku {
  return {
    productId: p.ProductId,
    id: p.Id,
    name: p.Name,
    packagedHeight: p.PackagedHeight,
    packagedLength: p.PackagedLength,
    packagedWeightKg: p.PackagedWeightKg,
    packagedWidth: p.PackagedWidth,
    isActive: p.IsActive,
    activateIfPossible: p.ActivateIfPossible,
    refId: p.RefId,
  };
}
