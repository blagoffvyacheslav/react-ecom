import {Category, Product} from "../ProductCard/constants/productConstants";
import axios from "axios";
import {API_URL} from "../ProductCard/constants/apiConstants";


const instance = axios.create({
    baseURL: API_URL
})

export async function getProducts(category_id?: Category['id'], limit = -1) {
    if (category_id)
        return instance.get<Product[]>(`/categories/${category_id}/products`,
            {
                params: {limit: limit, offset: 0}
            })
    return instance.get<Product[]>('/products')
}