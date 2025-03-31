export type Category = {
    id:number,
    name:string
}

export type Product = {
    'category': Category,
    'description': string,
    'id': number,
    'images': string[],
    'price': number,
    'title': string
}