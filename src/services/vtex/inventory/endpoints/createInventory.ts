import { z } from 'zod'

export const vtexEnableInventoryPayloadSchema = z.object({
  UnlimitedQuantity: z.boolean(),
  Quantity: z.number().nullable(),
})

export type VtexEnableInventoryPayload = z.infer<typeof vtexEnableInventoryPayloadSchema>
