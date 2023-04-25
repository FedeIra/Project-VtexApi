export type Sku = {
  id: number;
  productId: number;
  name: string;
  packagedHeight: number | null;
  packagedLength: number | null;
  packagedWidth: number | null;
  packagedWeightKg: number | null;
  isActive: boolean;
  activateIfPossible: boolean;
  refId: string | null;
};
