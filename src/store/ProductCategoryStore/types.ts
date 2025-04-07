export type GetProductCategoryListParams = {
  categoryId: string;
};

export interface IProductCategoryListStore {
  getProductsList(params: GetProductCategoryListParams): Promise<void>;
}
