import { Category, Product } from '../ProductDetailedPage/constants/product';
import { instance } from '../../api/axiosInstance';

export async function getProducts(category_id?: Category['id'], limit = -1) {
  if (category_id)
    return instance.get<Product[]>(`/categories/${category_id}/products`, {
      params: { limit: limit, offset: 0 },
    });
  return instance.get<Product[]>('/products');
}
