export type Product = {
  id: number;
  name: string;
  departmentId: number;
  categoryId: number;
  brandId: number;
  linkId: string;
  refId: string | null;
  isVisible: boolean;
  description: string | null;
  descriptionShort: string | null;
  releaseDate: string | null;
  keyWords: string | null;
  title: string | null;
  isActive: boolean;
  taxCode: string | null;
  metaTagDescription: string | null;
  showWithoutStock: boolean;
  score: number | null;
};
