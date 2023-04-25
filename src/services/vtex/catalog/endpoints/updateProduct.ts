import { z } from 'zod'
import { VtexProductSchema } from '../entities/product.js'

export type UpdateProductPayload = z.infer<typeof updateProductPayloadSchema>

export const updateProductPayloadSchema = VtexProductSchema

export const updateProductResponseSchema = VtexProductSchema

export const createProductResponseSchema = VtexProductSchema
