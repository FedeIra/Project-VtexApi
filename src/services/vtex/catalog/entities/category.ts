import { z } from 'zod'
import { Category } from '../../../../models/category.js'

export const VtexCategorySchema = z.object({
  Id: z.number(),
  Name: z.string(),
  FatherCategoryId: z.number().nullable(),
  Description: z.string().nullable(),
  Keywords: z.string(),
  Title: z.string(),
  IsActive: z.boolean(),
  ShowInStoreFront: z.boolean(),
  ShowBrandFilter: z.boolean(),
  ActiveStoreFrontLink: z.boolean(),
  GlobalCategoryId: z.number(),
  StockKeepingUnitSelectionMode: z.string(),
  Score: z.number().nullable(),
})

type VtexCategory = z.infer<typeof VtexCategorySchema>

export function toModelCategory(p: VtexCategory): Category {
  return {
    id: p.Id,
    isActive: p.IsActive,
    keyWords: p.Keywords,
    name: p.Name,
    score: p.Score,
    description: p.Description,
    title: p.Title,
    fatherCategoryId: p.FatherCategoryId,
    showInStoreFront: p.ShowInStoreFront,
    showBrandFilter: p.ShowBrandFilter,
    activeStoreFrontLink: p.ActiveStoreFrontLink,
    globalCategoryId: p.GlobalCategoryId,
    stockKeepingUnitSelectionMode: p.StockKeepingUnitSelectionMode
  }
}