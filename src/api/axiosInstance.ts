import axios from 'axios';
import { API_URL } from '../pages/ProductDetailedPage/constants/api';

export const instance = axios.create({
  baseURL: API_URL,
});
