import { Category } from '../ProductCard/constants/product';
import { instance } from '../../api/axiosInstance';

export async function getCategories() {
  return instance.get<Category[]>('/categories');
}
