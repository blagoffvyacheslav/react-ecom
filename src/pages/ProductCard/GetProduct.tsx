import {Product} from "./constants/productConstants";
import axios from "axios";
import {API_URL} from "./constants/apiConstants";


const instance = axios.create({
    baseURL: API_URL
})
export async function getProduct(id: string) {
    return instance.get<Product>(`/products/${id}`)
}