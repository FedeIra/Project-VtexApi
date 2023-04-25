import { z } from 'zod';
import { Brand } from '../../../../models/brand.js';

export const VtexBrandSchema = z.object({
  Id: z.number(),
  Name: z.string(),
  Text: z.string().nullable(),
  Keywords: z.string().nullable(),
  SiteTitle: z.string().nullable(),
  Score: z.number().nullable(),
  MenuHome: z.boolean(),
  Active: z.boolean(),
  LinkId: z.string().nullable(),
});

type VtexBrand = z.infer<typeof VtexBrandSchema>;

export function toModelBrand(p: VtexBrand): Brand {
  return {
    id: p.Id,
    name: p.Name,
    text: p.Text,
    keywords: p.Keywords,
    siteTitle: p.SiteTitle,
    score: p.Score,
    menuHome: p.MenuHome,
    active: p.Active,
    linkId: p.LinkId,
  };
}
