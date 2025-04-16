export type GetProductCategoryListParams = {
  categoryId: string;
  title?: string;
  page: number;
};

export interface IProductCategoryListStore {
  getProductsList(params: GetProductCategoryListParams): Promise<void>;
}
