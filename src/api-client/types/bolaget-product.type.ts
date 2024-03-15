import { BolagetProductImage, BolagetProductTasteClock } from '.';

export type BolagetProduct = {
  productNumber: string;
  productNameBold: string; //Bryggeri
  productNameThin: string;
  producerName: string;
  bottleText: string; // Burk/Flaska
  productLaunchDate: string; //ISO Date
  sellStartTime: string; // Time
  isCompletelyOutOfStock: boolean;
  isTemporaryOutOfStock: boolean;
  alcoholPercentage: number;
  volumeText: string; //330 ml
  volume: number;
  price: number;
  country: string;
  categoryLevel1: string | null;
  categoryLevel2: string | null;
  categoryLevel3: string | null;
  categoryLevel4: string | null;
  customCategoryTitle: string;
  assortmentText: string;
  usage: string;
  taste: string;
  recycleFee: number; //Pant
  images: BolagetProductImage[];
  color: string;
  tasteSymbols: string[]; //Passar till
  tasteClocks: BolagetProductTasteClock[]; // max 12
};
