import {Category} from "../ProductCard/constants/productConstants";
import axios from "axios";
import {API_URL} from "../ProductCard/constants/apiConstants";


const instance = axios.create({
    baseURL: API_URL
})

export async function getCategories() {
    return instance.get<Category[]>('/categories')
}