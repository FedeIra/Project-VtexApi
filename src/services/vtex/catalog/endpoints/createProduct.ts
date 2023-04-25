import { VtexProductSchema } from '../entities/product.js'

export type CreateProductPayload = {
  Name: string
  CategoryId: number
  BrandId: number
}

export const createProductResponseSchema = VtexProductSchema
