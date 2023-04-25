import { z } from 'zod';
import { Brand } from '../../../../models/brand.js';

export type CreateBrandPayload = {
  Name: string;
  Active: boolean;
};

type VtexBrandResponse = z.infer<typeof createBrandResponseSchema>;

export const createBrandResponseSchema = z.object({
  Id: z.number(),
  Name: z.string(),
  Text: z.string().nullable(),
  Keywords: z.string().nullable(),
  SiteTitle: z.string().nullable(),
  Score: z.number().nullable(),
  MenuHome: z.null(),
  Active: z.boolean(),
  LinkId: z.string().nullable(),
});

export function toModelBrandBad(p: VtexBrandResponse): Brand {
  return {
    id: p.Id,
    name: p.Name,
    text: p.Text,
    keywords: p.Keywords,
    siteTitle: p.SiteTitle,
    score: p.Score,
    menuHome: p.MenuHome !== null,
    active: p.Active,
    linkId: p.LinkId,
  };
}
