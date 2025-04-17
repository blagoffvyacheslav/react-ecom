export type GetProductListParams = {
  title?: string;
  page?: number;
  categoryId?: number;
  pageSize?: number;
  excludeId?: number;
};

export interface IProductListStore {
  getProductsList(params: GetProductListParams): Promise<void>;
}
