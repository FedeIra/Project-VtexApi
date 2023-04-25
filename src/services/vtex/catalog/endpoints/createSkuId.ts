import { VtexSkuSchema } from '../entities/sku.js';

export type CreateSkuPayload = {
  ProductId: number;
  Name: string;
  PackagedHeight: number | null;
  PackagedLength: number | null;
  PackagedWidth: number | null;
  PackagedWeightKg: number | null;
  ActivateIfPossible: boolean;
  RefId: string | null;
};

export const createSkuResponseSchema = VtexSkuSchema;
