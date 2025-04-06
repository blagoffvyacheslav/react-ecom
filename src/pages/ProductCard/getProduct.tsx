import { Product } from './constants/product';
import { instance } from '../../api/axiosInstance';

export async function getProduct(id: string) {
  return instance.get<Product>(`/products/${id}`);
}
