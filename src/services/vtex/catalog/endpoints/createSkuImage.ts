import { z } from 'zod'

export const CreateSkuImageSchema = z.object({
  Url: z.string(),
  Name: z.string(),
  SkuId: z.number()
})

export type CreateSkusImagePayload = z.infer<typeof CreateSkuImageSchema>
