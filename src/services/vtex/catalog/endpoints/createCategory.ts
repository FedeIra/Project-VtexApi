import { VtexCategorySchema } from '../entities/category.js'

export type UnitSelectionMode = 'SPECIFICATION' | 'LIST'

export type CreateCategoryPayload = {
  Name: string
  FatherCategoryId: number | null,
  Title: string,
  Description: string | null,
  KeyWords: string,
  ShowInStoreFront: boolean,
  ShowBrandFilter: boolean,
  IsActive: boolean,
  ActiveStoreFrontLink: boolean,
  GlobalCategoryId: number,
  StockKeepingUnitSelectionMode: UnitSelectionMode,
  Score: number | null,
}

export const createCategoryResponseSchema = VtexCategorySchema
