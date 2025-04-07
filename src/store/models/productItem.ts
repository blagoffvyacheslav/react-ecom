import { CategoryItemModel } from './categoryItem';

export type ProductItemModel = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryItemModel;
  images: string[];
  creationAt: string;
  updatedAt: string;
};
