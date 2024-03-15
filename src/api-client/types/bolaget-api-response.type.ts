import { BolagetProduct } from '.';

export type BolagetAPIResponse = {
  filterMenuItems: any[];
  filters: any[];
  metadata: { docCount: number; nextPage: number };
  products: BolagetProduct[];
};
