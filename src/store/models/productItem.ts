import { Images } from '@pages/ProductDetailedPage/constants/product';
import { CategoryItemModel } from './categoryItem';

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Info = {
  pagination: Pagination;
};

export type ProductItemModel = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  productCategory: CategoryItemModel;
  images: Images[];
  creationAt: string;
  updatedAt: string;
};
